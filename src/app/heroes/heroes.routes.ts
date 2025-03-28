import { CanMatchGuuard } from '../auth/services/guards/auth.guard';
import { LayoutHeroComponent } from './pages/layout/layout-hero.component';
import { Routes } from '@angular/router';


export const HeroesRoutes: Routes = [

  //ruta hija de heroes en el app.routes.ts
  { // http://localhost:4200/heroes
    path: '', component: LayoutHeroComponent, children: [

      {
        path: 'list', loadComponent:
          () => import('./pages/list-pages/list-pages.component')
            .then(c => c.ListPagesComponent)
      },
      {
        path: 'add/:id', loadComponent:
          () => import('./pages/add-pages/add-pages.component')
            .then(c => c.AddPagesComponent)
      },
      {
        path: 'add', loadComponent:
          () => import('./pages/add-pages/add-pages.component')
            .then(c => c.AddPagesComponent)
      },
      {
        path: 'search', loadComponent:
          () => import('./pages/search-pages/search-pages.component')
            .then(c => c.SearchPagesComponent)
      },
      {
        path: 'hero/:id', loadComponent:
          () => import('./pages/hero-pages/hero-pages.component')
            .then(c => c.HeroPagesComponent)
      },




    ],


  },



];



