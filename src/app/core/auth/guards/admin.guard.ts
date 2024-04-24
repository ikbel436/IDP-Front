// import { Injectable } from '@angular/core';
// import { CanActivate, CanActivateChild, Router } from '@angular/router';
// import { AuthService } from 'app/core/auth/auth.service';
// import { Observable, of } from 'rxjs';
// import { map } from 'rxjs/operators';

// export class AdminGuard implements CanActivate, CanActivateChild {
//     constructor(private authService: AuthService, private router: Router) {}
  
//     canActivate(): Observable<boolean> {
//       return this.checkUserRole();
//     }
  
//     canActivateChild(): Observable<boolean> {
//       return this.checkUserRole();
//     }
  
//     private checkUserRole(): Observable<boolean> {
//       return this.authService.getUserRole().pipe(
//         map(userRole => {
//           if (userRole === 'admin') {
//             return true; // Allow access for admins
//           } else {
//             this.router.navigate(['/pages/error/500']); // Redirect non-admin users
//             return false;
//           }
//         })
//       );
//     }
//   }