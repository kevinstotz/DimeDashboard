import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Environment } from '../environments/index';
import { Authentication, Oauth2 } from '../_models/index';
import { CookieService, CookieOptions } from 'ngx-cookie';

@Injectable()
export class AuthenticationService implements OnInit {
    private oauth2: Oauth2;
    private loggedin: boolean;
    private cookieOptions: CookieOptions;
    private environment: Environment;

    constructor(
      private http: HttpClient,
      private cookieService: CookieService) {
        this.oauth2 = new Oauth2();
        this.loggedin = false;
        this.environment = new Environment();
        this.cookieOptions = { domain: this.environment.global.DOMAIN };
    }

    ngOnInit() {

    }

    authentication() {


    }

    login(username: string, password: string) {
        this.oauth2.grant_type = "password";
        this.oauth2.username = username;
        this.oauth2.password = password;
        this.oauth2.client_id = "HJ4fGABHYt3jBamsPsmnW3qziY3JAT4Oz4h6NZUe";

        return this.http.post<Authentication>(this.environment.api.LOGIN_URL, this.oauth2)
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
        localStorage.removeItem('Id');
        sessionStorage.removeItem('Id');
        this.cookieService.remove('Id', this.cookieOptions);
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
        this.cookieService.remove('currentUser', this.cookieOptions);
    }

    getCurrentUserId() {
        return this.cookieService.get('Id');
    }

    isLoggedIn() {
      return this.loggedin;
    }
}
