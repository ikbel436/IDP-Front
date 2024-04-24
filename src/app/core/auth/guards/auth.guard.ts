import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) =>
{
    const router: Router = inject(Router);
    const authService: AuthService = inject(AuthService);
    // Check the authentication status
    return inject(AuthService).check().pipe(
        switchMap((authenticated) =>
        {
          console.log(authenticated)
            // If the user is not authenticated...
            if ( !authenticated )
            {
                // Redirect to the sign-in page with a redirectUrl param
                const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
                const urlTree = router.parseUrl(`sign-in?${redirectURL}`);

                return of(urlTree);
            }
            const userRole = authService.getUserRole();
            if (userRole === 'admin' && route.data.role && route.data.role !== 'admin') {
              // If the user is an admin but the route is not for admins, redirect or deny access
              return of(false);
            }
      
            // Allow the access
            return of(true);
        }),
    );
};
