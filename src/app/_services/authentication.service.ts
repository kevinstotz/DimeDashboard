import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { GlobalVariable } from '../globals/globals';
import { Authentication, Oauth2 } from '../_models/index';
import { CookieService, CookieOptions } from 'ngx-cookie';

@Injectable()
export class AuthenticationService {
    private oauth2 = new Oauth2();
    public loggedin: boolean = false;
    private cookieOptions: CookieOptions;

    constructor(
      private http: HttpClient,
      private cookieService: CookieService
    ) { }

    ngOnInit() {
        this.cookieOptions = { domain: GlobalVariable.DOMAIN };
    }

    login(username: string, password: string) {
        this.oauth2.grant_type = "password";
        this.oauth2.username = username;
        this.oauth2.password = password;
        this.oauth2.client_id = "HJ4fGABHYt3jBamsPsmnW3qziY3JAT4Oz4h6NZUe";

        return this.http.post<Authentication>(GlobalVariable.LOGIN_URL, this.oauth2)
            .map((authenticationResponse: Authentication) => {
                // login successful if there's a jwt token in the response
                if (authenticationResponse && authenticationResponse.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(authenticationResponse));
                    sessionStorage.setItem('currentUser', JSON.stringify(authenticationResponse));
                    this.cookieService.put('currentUser', JSON.stringify(authenticationResponse), this.cookieOptions);
                    this.loggedin = true;
                }

                return authenticationResponse;
            });
    }

    logout() {
        // remove user from local storage to log user out
        this.loggedin = false;
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
        this.cookieService.remove('currentUser', this.cookieOptions);
    }

    isLoggedIn() {
      return this.loggedin;
    }
}
