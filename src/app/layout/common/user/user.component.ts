import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
@Component({
    selector       : 'user',
    templateUrl    : './user.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'user',
    standalone     : true,
    imports        : [MatButtonModule, MatMenuModule, NgIf, MatIconModule, NgClass, MatDividerModule],
})
export class UserComponent implements OnInit, OnDestroy
{
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    user: User;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _userService: UserService,
        private _authService: AuthService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    currentUser: any;
    /**
     * On init
     */
    // ngOnInit(): void
    // {
    //     // Subscribe to user changes
    //     this._userService.user$
    //         .pipe(takeUntil(this._unsubscribeAll))
    //         .subscribe((user: User) =>
    //         {
    //             this.user = user;

    //             // Mark for check
    //             this._changeDetectorRef.markForCheck();
    //         });
    //          this._userService.get().subscribe(
    //     user => {
    //       this.currentUser = user;
    //     },
    //     error => {
    //       console.error('Error fetching current user:', error);
    //     }
    //   );   
     
    // }
    ngOnInit(): void {
        this._userService.get().subscribe(
          (user: User) => {
            this.currentUser = user;
          },
          (error) => {
            console.error('Error fetching current user:', error);
          }
        );
      }
    
      updateStatus(status: string): void {
        if (this.currentUser) {
          this.currentUser.status = status;
          this.updateUserInfo(); // Vous pouvez appeler votre méthode pour mettre à jour le statut ici si nécessaire
        }
      }
    
      // Autres méthodes de votre composant
    
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
       this._unsubscribeAll.next(null);
       this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
 
    /**
     * Update the user status
     *
     * @param status
     */
    
    // updateUserStatus(status: string): void
    // {
    //     // Return if user is not available
    //     if ( !this.user )
    //     {
    //         return;
    //     }

    //     // Update the user
    //     this._userService.update({
    //         ...this.user,
    //         status,
    //     }).subscribe();
    // }
    updateUserStatus(status: string): void {
        // Return if currentUser is not available
        if (!this.currentUser) {
            return;
        }
    
        // Update the currentUser's status
        this._userService.update({
            ...this.currentUser, // Spread operator to retain other properties
            status,
        }).subscribe(
            () => {
                console.log('User status updated successfully.');
            },
            (error) => {
                console.error('Error updating user status:', error);
                // Handle error response
            }
        );
    }
    navigateToProfilePage(): void {
      // Utilisez la méthode navigate pour naviguer vers la page de profil
      this._router.navigate(['/ui/forms/fields']); // Remplacez '/profile' par le chemin de votre page de profil
  }
    updateStatus1( status: string): void {
        this._userService.updateUserStatus( status).subscribe(
          (response) => {
            console.log('User status updated successfully:', response);
            this.currentUser.status = status;
          },
          (error) => {
            console.error('Error updating user status:', error);
            // Handle error response
          }
        );
      }
    status: string;
    updateUserInfo(): void {
        // Prepare updated user object
        const updatedUser = {
            status: this.status,
         
        };
    
        // Call the service method to update user info
        this._userService.update(updatedUser).subscribe(
          (response) => {
            console.log('User updated successfully:', response);
            // Handle success response
          },
          (error) => {
            console.error('Error updating user:', error);
            // Handle error response
          }
        );
      }
    //   updateStatus(status: string): void {
    //     this.status = status;
    //     this.updateUserInfo(); // Appeler la méthode pour mettre à jour le statut de l'utilisateur
    //   }
    /**
     * Sign out
     */
    signOut(): void
    {   this._authService.signOut();
        this._router.navigate(['/sign-out']);
    }
}
