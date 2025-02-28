import { Component, Inject, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { RouterModule } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-pages',

  imports: [RouterModule, CommonModule],
  templateUrl: './add-pages.component.html',
  styleUrl: './add-pages.component.css'
})
export class AddPagesComponent {

  // Inyectamos el servicio de heroes
  private heroServices = Inject(HeroesService);



}
