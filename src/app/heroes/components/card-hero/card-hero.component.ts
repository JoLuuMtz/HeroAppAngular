import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'heroes-card-hero',
  imports: [MaterialModule, CommonModule],
  templateUrl: './card-hero.component.html',
  styleUrl: './card-hero.component.css'
})
export class CardHeroComponent implements OnInit {


  @Input()
  public hero!: Hero;



  ngOnInit(): void {
    //la propiedad es requerida en el component
    if (!this.hero) {
      throw Error('La propieda es requerida ' +
        'para usar el component card-hero');
    }
  }
}
