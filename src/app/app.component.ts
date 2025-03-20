import { AuthService } from './auth/services/auth.service';
import { Component, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterOutlet, RouterStateSnapshot, Routes } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { map } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements CanActivate {

  ngOnInit(): void {

  }
  title = 'LazyLoadingRouting';

  private readonly AuthService: AuthService = inject(AuthService);
  private readonly _routes: Router = inject(Router);
// 

  // Can Activated  Asincrono
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
  //   return this.AuthService.CheckAuthentification().pipe(


  //   );

  // }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<boolean> {
    return this.AuthService.CheckAuthentification().pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        }
        this._routes.navigate(['/auth/login']);
        return false;


      }
      ));

  }

  // can Acitvated Sincrono devuelve un valor booleano

  // canActivate(): boolean {

  //   return true
  // }


}
