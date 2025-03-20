import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth.service';
import { map} from 'rxjs';

// redirecciona si el usuario esta autenticado no lo
// manda al login si no que a la pagina principal

export const PublicGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService: AuthService = inject(AuthService);

  const userAuthenticated = authService.CheckAuthentification().pipe(
    map((isAuthentitcated) => { // se usa map porque modifica la salida del observable a false o true
      if (isAuthentitcated) { // verifica si esta autenticado
        router.navigate(['/heroes/home']);
        return false; // retorna falso no lo deja entrar a la ruta
      }
      return true; // retorna true si esta no esta autenticado por lo tanto lo deja acceder a la ruta
    }
    )
  );

  return userAuthenticated;
};
