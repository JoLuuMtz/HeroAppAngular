import { Component,  OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesService } from '../../services/heroes.service';
import { RouterModule } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { MaterialModule } from '../../../material/material.module';
import { CardHeroComponent } from '../../components/card-hero/card-hero.component';



@Component({
  selector: 'app-list-pages',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    CardHeroComponent

  ],
  templateUrl: './list-pages.component.html',
  styleUrl: './list-pages.component.css'
})
export class ListPagesComponent implements OnInit {

  constructor(private readonly services: HeroesService) { }

  // private services = Inject(HeroesService);


  public Hero: Hero[] = [];

  ngOnInit(): void {

    this.services.getHero()
      .subscribe((heroes: Hero[]) => {
        this.Hero = heroes;
      });
  }

}
