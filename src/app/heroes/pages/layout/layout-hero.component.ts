import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, MaterialModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout-hero.component.css'
})
export class LayoutHeroComponent implements OnInit {
  ngOnInit(): void {
    const recuperado = localStorage.getItem('UserId');







  }

  private readonly _router = inject(Router);
  private _authService = inject(AuthService);

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

  public user?: User = this._authService.getUser;

  LogOut(): void {
    this._authService.logout();
    this._router.navigate(['/']);
  }




}

