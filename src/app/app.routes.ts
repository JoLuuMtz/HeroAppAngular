
import { Routes } from '@angular/router';

import { NotfoundPagesComponent } from './shared/pages/notfound-pages/notfound-pages.component';
import { AuthGuard, CanMatchGuuard } from './auth/services/guards/auth.guard';
import { PublicGuard } from './auth/services/guards/public.guard';



export const routes: Routes = [


  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  {
    path: 'auth', loadChildren:
      () => import('./auth/auth.routes').then(r => r.AuthRoutes),
      canActivate: [PublicGuard] // permite que la ruta login no se acceda si estas logueado

  },
  {
    path: 'heroes', loadChildren:
      () => import('./heroes/heroes.routes').then(r => r.HeroesRoutes),
    canActivate: [AuthGuard], canMatch: [CanMatchGuuard]
  },
  { path: '404', component: NotfoundPagesComponent },

  { path: '**', redirectTo: '/404', },

  
];
