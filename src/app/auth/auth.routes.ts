
import { Routes } from '@angular/router';
import { LayoutAuthComponent } from './layout-page/layout-auth-page.component';



export const AuthRoutes: Routes = [

  {
    //ruta hija de Auth en el app.routes.ts
    path: '', component: LayoutAuthComponent,
    children: [//rutas hijas de Auth
      {
        path: 'login', loadComponent:
          () => import('./login-pages/login-pages.component')
            .then(c => c.LoginPagesComponent)
      },
      {
        path: 'register', loadComponent:
          () => import('./register-pages/register-pages.component')
            .then(c => c.RegisterPagesComponent)
      },
    ]







  }


];
