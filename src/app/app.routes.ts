import { Routes } from '@angular/router';

import { NotfoundPagesComponent } from './shared/pages/notfound-pages/notfound-pages.component';



export const routes: Routes = [


  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth', loadChildren:
      () => import('./auth/auth.routes').then(r => r.AuthRoutes)
  },
  {
    path: 'heroes', loadChildren:
      () => import('./heroes/heroes.routes').then(r => r.HeroesRoutes)
  },
  { path: '404', component: NotfoundPagesComponent },

  { path: '**', redirectTo: '/404',   },

];
