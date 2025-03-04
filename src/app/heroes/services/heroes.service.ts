import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/hero.interface';
import { env } from '../../../env/env';
import { catchError, Observable, of } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class HeroesService {

  constructor(private http: HttpClient) { }

  // Definimos un array de heroes
  public heroes: Hero[] = [];

  private url = env.API;

  // obtiene los heroes de la API
  getHero(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.url}/heroes`);
  }

  // obtiene un heroe por su id
  GetHeroById(id: string): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.url}/heroes/${id}`)
      .pipe(
        catchError(() => {
          return of(undefined);
        })
      );
  }

}

