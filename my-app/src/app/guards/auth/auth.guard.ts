import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { ROUTES_APP } from '../../core/enum/routes.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);  
  const router = inject(Router);
  //pipe() une una función con otra
  //tap() guarda la información de la sesión
  return authService.validateToken().pipe(tap((isAuthenticated)=>{
    if (!isAuthenticated) {
      router.navigateByUrl(ROUTES_APP.AUTH);
    }
  }));
};
