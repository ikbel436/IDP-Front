import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from 'app/core/user/user.types';
import { map, Observable, ReplaySubject, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService
{   private apiUrl = 'http://localhost:3000/auth';
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User>
    {        
        return this._user.asObservable();
    }
    set accessToken(jwt: string) {
        // Set the JWT token in a cookie
        document.cookie = `jwt=${jwt}; path=/; secure; samesite=strict`;
        console.log(jwt);
    }

    get accessToken(): string {
        // Parse document.cookie to get the JWT token
        const cookies = document.cookie.split('; ');
        const accessTokenCookie = cookies.find(cookie => cookie.startsWith('jwt='));
        console.log('AccessTokenCookie:', document.cookie);
        return accessTokenCookie ? accessTokenCookie.split('=')[1] : '';
        
    }
   
    //token = localStorage.getItem('accessToken');
  // token = `jwt=${jwt}; path=/; secure; samesite=strict`;
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */

    get(): Observable<User>
    { 
         const url = `${this.apiUrl}/current`;
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.accessToken}` // Remplacez `votreToken` par votre véritable token
    });
        return this._httpClient.get<User>(url, {headers: headers}).pipe(
            tap((user) =>
            {
                this._user.next(user);
            }),
        );
    }
    post(): Observable<User>
    {   const url = `${this.apiUrl}/user`;
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.accessToken}` // Remplacez `votreToken` par votre véritable token
    });
        return this._httpClient.get<User>(url, {headers: headers}).pipe(
            tap((user) =>
            {
                this._user.next(user);
            }),
        );
    }


  
    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any>
    {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            map((response) =>
            {
                this._user.next(response);
            }),
        );
    }
}
