import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    private apiUrl = 'http://localhost:3000/auth';
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    // Setter & getter for access token
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
        console.log(token);
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
    forgotPassword(email: string): Observable<any> {
        const url = `${this.apiUrl}/forgot-password`;
        return this._httpClient.post(url, email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    set resetPasswordToken(accessToken: string) {
        localStorage.setItem('resetPasswordToken', accessToken);
    }
    get resetPasswordToken(): string {
        return localStorage.getItem('resetPasswordToken') ?? '';
    }
    resetPassword(password: string): Observable<any> {
        const accessToken = this.resetPasswordToken;

        const url = `${this.apiUrl}/reset-password`;
        const requestBody = {
            password: password,
            resetPasswordToken: accessToken,
        };
        console.log(requestBody);

        return this._httpClient.post(url, requestBody).pipe(
            tap(() => {
                // Supprimer le resetPasswordToken du localStorage après l'utilisation
                localStorage.removeItem('resetPasswordToken');
            })
        );
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }
        const url = `${this.apiUrl}/login`;
        return this._httpClient
            .post<any>(url, credentials)
            .pipe(
                switchMap((response: any) => {
                    console.log(response.accessToken);
                    // Store the access token in the local storage
                    this.accessToken = response.accessToken;

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    // Return a new observable with the response
                    return of(response);
                })
            );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Sign in using the token
        return this._httpClient
            .post('api/auth/sign-in-with-token', {
                accessToken: this.accessToken,
            })
            .pipe(
                catchError(() =>
                    // Return false
                    of(false)
                ),
                switchMap((response: any) => {
                    // Replace the access token with the new one if it's available on
                    // the response object.
                    //
                    // This is an added optional step for better security. Once you sign
                    // in using the token, you should generate a new one on the server
                    // side and attach it to the response object. Then the following
                    // piece of code can replace the token with the refreshed one.
                    if (response.accessToken) {
                        this.accessToken = response.accessToken;
                    }

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    // Return true
                    return of(true);
                })
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
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
    signUp(user: {
        name: string;
        email: string;
        password: string;
        confirm_password: string;
        phoneNumber: string;
    }): Observable<any> {
        const url = `${this.apiUrl}/register`;
        return this._httpClient.post(url, user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        console.log(this._authenticated);
        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        // if ( AuthUtils.isTokenExpired(this.accessToken) )
        // {
        //     return of(false);
        // }
        this._authenticated = true;
        this.accessToken = localStorage.getItem('accessToken');
        // If the access token exists, and it didn't expire, sign in using it
        return of(true);
    }
}
