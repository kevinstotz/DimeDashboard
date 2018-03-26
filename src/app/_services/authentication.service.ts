import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Environment } from '../environments/index';
import { AuthenticationResponse, Oauth2, RefreshToken } from '../_models/index';
import { CookieService, CookieOptions } from 'ngx-cookie';

@Injectable()
export class AuthenticationService {
    private oauth2: Oauth2;
    private refreshToken: RefreshToken;
    private loggedin: boolean;
    private cookieOptions: CookieOptions;
    private environment: Environment;
    private cachedRequests: Array<HttpRequest<any>> = [];
    private httpOptions: object;

    constructor(
      private http: HttpClient,
      private cookieService: CookieService) {
        this.oauth2 = new Oauth2();
        this.refreshToken = new RefreshToken();
        this.loggedin = false;
        this.environment = new Environment();
        this.cookieOptions = { domain: this.environment.global.DOMAIN };
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        this.environment = new Environment();
    }

    public getTokenExpiration() {
      let currentUser: AuthenticationResponse = new AuthenticationResponse();

      currentUser = <AuthenticationResponse>JSON.parse(JSON.parse(localStorage.getItem('currentUser')));
      if (currentUser && currentUser.expires) {
        return currentUser.expires;
      }
      let t = new Date();
      return t.getTime() / 1000;
    }

    public getRefreshToken() {
        let currentUser: AuthenticationResponse = new AuthenticationResponse();
        let c = localStorage.getItem('currentUser');
        currentUser = <AuthenticationResponse>JSON.parse(JSON.parse(c));
        if (currentUser && currentUser.refresh_token) {

          this.refreshToken.grant_type = "refresh_token";
          this.refreshToken.refresh_token = currentUser.refresh_token;
          this.refreshToken.client_id = "HJ4fGABHYt3jBamsPsmnW3qziY3JAT4Oz4h6NZUe";
          this.refreshToken.client_secret = "";

          let response = this.http.post<AuthenticationResponse>(this.environment.api.LOGIN_URL, this.refreshToken, this.httpOptions)
          response.subscribe( (authenticationResponse: AuthenticationResponse) => {
              // refresh token successful if there's a jwt token in the response
              if (authenticationResponse && authenticationResponse.refresh_token) {
                  var t = new Date();
                  t.setSeconds(t.getSeconds() + authenticationResponse.expires_in);
                  authenticationResponse.expires = t.getTime() / 1000;
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(authenticationResponse));
                  sessionStorage.setItem('currentUser', JSON.stringify(authenticationResponse));
                  this.cookieService.put('currentUser', JSON.stringify(authenticationResponse), this.cookieOptions);
                  this.loggedin = true;
              } else {

                     this.retryFailedRequests();
                     this.logout();
                     window.location.href=this.environment.global.WEBSITE_URL;

              }
          });

          }
    }

    public login(username: string, password: string) {
        this.oauth2.grant_type = "password";
        this.oauth2.username = username;
        this.oauth2.password = password;
        this.oauth2.client_id = "HJ4fGABHYt3jBamsPsmnW3qziY3JAT4Oz4h6NZUe";

        return this.http.post<AuthenticationResponse>(this.environment.api.LOGIN_URL, this.oauth2)
            .map((authenticationResponse: AuthenticationResponse) => {
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

    public logout() {
        // remove user from local storage to log user out
        this.loggedin = false;
        localStorage.removeItem('Id');
        sessionStorage.removeItem('Id');
        this.cookieService.remove('Id', this.cookieOptions);
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
        this.cookieService.remove('currentUser', this.cookieOptions);
    }

    public getCurrentUserId() {
        return this.cookieService.get('Id');
    }

    public isLoggedIn() {
      return this.loggedin;
    }


    public collectFailedRequest(request): void {
        this.cachedRequests.push(request);
    }
    public retryFailedRequests(): void {
        console.log("retry failed request..not implemented");
    }
}
