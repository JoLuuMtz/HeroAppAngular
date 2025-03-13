import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';


import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImgPipe } from '../../pipes/img.pipe';

@Component({
  selector: 'heroes-card-hero',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ImgPipe],
  templateUrl: './card-hero.component.html',
  styleUrl: './card-hero.component.css'
})
export class CardHeroComponent implements OnInit {

  protected isVisited = false;

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
