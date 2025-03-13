import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/hero.interface';
import { env } from '../../../env/env';
import { catchError, map, Observable, of, throwError } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class HeroesService {


  constructor(private http: HttpClient) { }

  // Definimos un array de heroes
  public heroes: Hero[] = [];




  private url = env.API;

  // obtiene los heroes de la API
  public getHero(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.url}/heroes`);
  }

  // obtiene un heroe por su id
  public GetHeroById(id: string): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.url}/heroes/${id}`)
      .pipe(
        catchError(() => {
          return of(undefined);
        })
      );
  }

  // Obtener heroes por medio de Query
  public getSearchHero(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.url}/heroes?q=${query}`);
  }


  // Crud Heroes

  // Create
  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.url}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.url}/heroes/${hero.id}`, hero);
  }

  // Ingresa heroe.id
  // RETURN: Observable<boolean>
  deleteHeroiD(id: string ): Observable<boolean> {
    return this.http.delete<Hero>(`${this.url}/heroes/${id}`).pipe(
      // si la petición falla, retornamos un observable con el error
      catchError((error) => {
        console.error('Error:', error);
        return of(false); // si hubo un error en la petición, retornamos un observable con el valor false
      }),
      map(() => {
        return true; // si la petición es exitosa, retornamos un observable con el valor true
      }));
  }

  updateHeroWithPatch(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error('El id es requerido');
    return this.http.patch<Hero>(`${this.url}/heroes/${hero.id}`, hero);
  }
}

