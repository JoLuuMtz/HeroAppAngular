import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { delay, switchMap } from 'rxjs';
import { MaterialModule } from '../../../material/material.module';
import { ImgPipe } from '../../pipes/img.pipe';

@Component({
  selector: 'app-hero-pages',
  imports: [CommonModule, MaterialModule, ImgPipe],
  templateUrl: './hero-pages.component.html',
  styleUrl: './hero-pages.component.css'
})
export class HeroPagesComponent implements OnInit {


  // constructor(private activateRoute: ActivatedRoute,
  //   private router: Router,
  //   private readonly heroesService: HeroesService
  // ) { }

  private activateRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private heroesService = inject(HeroesService);

  public Hero !: Hero | undefined;

  ngOnInit(): void {
    this.activateRoute.params.pipe(
      delay(1000),
      // Ejecuta una vez por cada id o parametro  que cambie
      switchMap(({ id }) => this.heroesService.GetHeroById(id))
      // ejecuta el Observable del servicio
    ).subscribe((hero: Hero | undefined) => {
      if (!hero) { // verifica si es undefined
        this.router.navigate(['/notfound']);
        return;
      } // si no es undefined
      // le asigna los valores al Hero
      // para usar en el template
      this.Hero = hero;
      return;
    });
  }

  // VUELVE A LA PAGINA DEL LA LISTA DE HEROES
  goBack(): void {
    this.router.navigate(['/heroes/list']);
  }






}

