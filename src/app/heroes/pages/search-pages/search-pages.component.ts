import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CardHeroComponent } from '../../components/card-hero/card-hero.component';


@Component({
  selector: 'app-search-pages',
  imports: [
    RouterModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    CardHeroComponent
  ],
  templateUrl: './search-pages.component.html',
  styleUrl: './search-pages.component.css'
})
export class SearchPagesComponent {

  private readonly heroesService = inject(HeroesService);


  public searchHeroForm = new FormControl('');

  // opciones para el select

  //muestra las opciones del select
  public Hero: Hero[] = [];
  // obtiene la informacion del heroe seleccionado
  public heroSelected: Hero | undefined;

  // busca el hero por medio del input y lo muestra en el select
  public SearchHero(): void {

    const value: string = this.searchHeroForm.value || '';

    this.heroesService.getSearchHero(value)
      .subscribe((heroes) => this.Hero = heroes);

    console.log(this.Hero);

  }

  // selecciona el heroe y lo muestra en el select
  isSelected(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option.value.id);
    this.heroSelected = event.option.value;

    this.searchHeroForm.reset();

  }



}

