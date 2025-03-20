
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth.service';
import { filter, map, tap } from 'rxjs';
import { CanMatchFn } from '@angular/router';

// este es mi guard el cual obtiene el metodo CanActivateFn
// el cual recibe dos parametros
// guard de tipo CanActivate no deja acceder a la ruta si no se cumple la condicion

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // inyecion de los servicios de routas y mi authservice

  const router = inject(Router);
  const authService: AuthService = inject(AuthService);
  // retorno dependiendo de mi observable que emite mi metodo de comrpobacion de autenticacion
  return authService.CheckAuthentification().pipe(
    tap((isAuthenticated) => {

      if (isAuthenticated) {
        return true; // si el usuario es autenticado retorna true
        // y lo no le permite el paso a la ruta que quiere acceder
      }
      // lo manda para la ruta de login si no se ecuentra autenticado
      router.navigate(['/auth/login']);
      // retorna false, por lo tanto no le permite el paso a la ruta
      return false;
    })
  );
};

// guatd de tipo match no deja cargar la ruta si no se cumple la condicion
// manda la url como si no existiera dependiendo de la condicion
export const CanMatchGuuard: CanMatchFn = (
) => {
  // se injecta el servicio que valida la autenticacion del usuario

  const router = inject(Router);
  const authService: AuthService = inject(AuthService);

  const userAuthentication = authService.CheckAuthentification().pipe(


    tap((isAuthenticated) => { // map hace una transformacion de los datos o valores
      if (!isAuthenticated) {
        router.navigate(['/auth/login']);
        return false;
      }
      return true;
    }),
    tap((isAuthenticated) => { // tap permite hacer una accion secundaria sin modificar los datos
      if (isAuthenticated) {
        console.log(isAuthenticated);
      }
    })
  );
  return userAuthentication;

}


