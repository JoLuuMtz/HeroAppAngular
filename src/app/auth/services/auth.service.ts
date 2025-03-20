import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../../../env/env';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly URL = env.API;

  private _user?: User | null; // si el usaurio no se ha registrado es null

  // getter para para obtener el usuario

  get getUser(): User | undefined {
    // verifica si user tiene valores
    if (!this._user) return undefined;
    //  realiza una copia del objeto en una nueva referenvcia de memoria
    return structuredClone(this._user);
    // otra forma de hacer una copia
    // pero contiene la misma referencia de memoria
    // return {...this._user }
  }


  login(email: string, passwordd: string): Observable<User | undefined> {
    return this.http.get<User>(`${this.URL}/users/1`).pipe(
      tap(user => this._user = user),
      tap(user => localStorage.setItem('UserId', user.id)),//hace una operacion de escritura en el localstorage

      catchError(error => { // arroja un error si no se puede obtener el usuario
        console.error(error);
        return of(undefined);

      }));
  }


  // mira si el localstorage tiene un usuario registrado
  CheckAuthentification(): Observable<boolean> {
    // verifica si existe un usuario registrado
    if (!localStorage.getItem('UserId')) {
      return of(false);// retorna un observable con un valor de false
    }
    // obtiene el token del local storage  o el usuario
    const token = localStorage.getItem('UserId')

    // hace la peticion http para obtener el usuario

    return this.http.get<User>(`${this.URL}/users/1`).pipe(
      tap(user => this._user = user),// hace una copia del usuario
      map(user => !!user),// retorna un valor booleano con la doble negacion
      catchError(error => {
        console.warn(error);
        return of(false);// si ocurr eun eror retorna false  y muestra el error
      })
    );

  }

  logout(): void {
    this._user = null;
    localStorage.removeItem('UserId');
  }







}
