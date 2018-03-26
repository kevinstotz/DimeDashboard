import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse , HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationResponse } from '../_models/index'
import { AuthenticationService } from '../_services/index'
import 'rxjs/add/operator/map';
import {  tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Environment } from '../environments/index';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private environment: Environment;
    private updateTokenPromise: Promise<any>;

    constructor(private authenticationService: AuthenticationService,
                private router: Router) {
      this.environment = new Environment();
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available

        let currentUser: AuthenticationResponse = new AuthenticationResponse();
        currentUser = <AuthenticationResponse>JSON.parse(JSON.parse(localStorage.getItem('currentUser')));
        if (currentUser && currentUser.access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer '.concat(currentUser.access_token)
                }
            });
        }

        return next.handle(request)
          .pipe( tap(event => {
                if (event instanceof HttpResponse) {
                  var t = new Date();
                  if ( (this.authenticationService.getTokenExpiration() - (t.getTime() / 1000)) < 30 ) {
                    //this.authenticationService.getRefreshToken();
                    //.subscribe( response => {
                    //  if ( !response ) {
                    //      this.authenticationService.retryFailedRequests();
                          this.authenticationService.logout();
                          window.location.href=this.environment.global.WEBSITE_URL;
                    //  } else {
                    //    console.log(response);
                    //  }
                  //});
                  }
                }
              }, error => {
                if (error instanceof HttpErrorResponse) {
                  console.log("error");
                  if (error.status === 401) {
                    console.log(error.status);
                    this.authenticationService.collectFailedRequest(request);
                    this.authenticationService.logout();
                    window.location.href=this.environment.global.WEBSITE_URL;
                  }
                }
            })
        );
    }
}
