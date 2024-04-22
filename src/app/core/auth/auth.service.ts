import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({providedIn: 'root'})
export class AuthService
{private apiUrl = 'http://localhost:8080'; 
    private _authenticated: boolean = false;
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);
  
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    // forgotPassword(email: string): Observable<any>
    // {
    //     return this._httpClient.post('api/auth/forgot-password', email);
    // }
    forgotPassword(email: string) {
        return this._httpClient.post(`${this.apiUrl}/api/users/forgot-password`, { email });
     }
    /**
     * Reset password
     *
     * @param password
     */
    // resetPassword(password: string): Observable<any>
    // {
    //     return this._httpClient.post('api/auth/reset-password', password);
    // }
    resetPassword(token: string, password: string) {
        return this._httpClient.post(`${this.apiUrl}/api/password-reset/reset/${token}`, { password });
     }
    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post('http://localhost:8080/api/auth', credentials).pipe(
            switchMap((response: any) =>
            {

                console.log(response)
                // Store the access token in the local storage
                this.accessToken = response.token;
              // localStorage.setItem('token', response.token);
                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;
               
                // Return a new observable with the response
                return of(response);
            }),
        );
    }
    // ****************
    
    login(email: string, password: string) {
        return this._httpClient.post<{ token: string }>(`${this.apiUrl}/api/auth`, { email, password })
          .pipe(
            tap(response => {
              localStorage.setItem('token', response.token);
            })
          );
     }
     //*******************
     signInUsingToken1(email: string, password: string): Observable<any> {
        // Envoyer l'email et le mot de passe pour obtenir un nouveau token d'accès
        return this._httpClient.post<any>('http://localhost:8080/api/auth', {
            email,
            password
        }).pipe(
            catchError(() => of(false)),
            switchMap((response: any) => {
                console.log(response)
                // Vérifier si un nouveau token d'accès est disponible dans la réponse
                if (response.token) {
                    this.accessToken = response.token;
                    console.log(this.accessToken)
                    console.log(response.user);
                }
    
                // Mettre à jour l'état d'authentification
                this._authenticated = true;
    
                // Stocker l'utilisateur dans le service utilisateur
                this._userService.user = response.user;
               

                // Retourner true pour indiquer la réussite de la connexion
                return of(true);
            }),
        );
    }
    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        // Sign in using the token
        return this._httpClient.post('http://localhost:8080/api/auth', {
            token: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false),
            ),
            switchMap((response: any) =>
            {
                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
                if ( response.accessToken )
                {
                    this.accessToken = response.accessToken;
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            }),
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { firstName: string; email: string; password: string; lastName: string }): Observable<any>
    {
        return this._httpClient.post('http://localhost:8080/api/users', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
