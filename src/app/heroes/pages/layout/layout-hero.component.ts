import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, MaterialModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout-hero.component.css'
})
export class LayoutHeroComponent {

  public sideBarItem = [
    {
      icon: 'add',
      name: 'Nuevo Heroe',
      route: './add'
    },
    {
      icon: 'person',
      name: 'Heroes',
      route: './list'
    },
    {
      icon: 'search',
      name: 'Buscar Heroe',
      route: './search'
    },


  ];


}

