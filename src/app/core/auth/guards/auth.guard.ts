import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) =>
// {
//     const router: Router = inject(Router);

//     // Check the authentication status
//     return inject(AuthService).check().pipe(
//         switchMap((authenticated) =>
//         {
//             // If the user is not authenticated...
//             if ( !authenticated )
//             {
//                 // Redirect to the sign-in page with a redirectUrl param
//                 const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
//                 const urlTree = router.parseUrl(`sign-in?${redirectURL}`);

//                 return of(urlTree);
//             }

//             // Allow the access
//             return of(true);
//         }),
//     );
// };
@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> {
      return this.checkAuthentication(state.url);
    }
  
    canActivateChild(
      childRoute: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> {
      return this.checkAuthentication(state.url);
    }
  
    private checkAuthentication(url: string): Observable<boolean | UrlTree> {
      return this.authService.check().pipe(
        switchMap(authenticated => {
          if (!authenticated) {
            // Redirect to the sign-in page with a redirectUrl param
            const redirectURL = url === '/sign-out' ? '' : `redirectURL=${url}`;
            return of(this.router.createUrlTree(['sign-in'], { queryParams: { redirectURL } }));
          }
          return of(true);
        })
      );
    }
  }