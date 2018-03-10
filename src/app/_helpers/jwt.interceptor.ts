import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Authentication } from '../_models/index'


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available

        let currentUser: Authentication = new Authentication();
        currentUser = <Authentication>JSON.parse(JSON.parse(localStorage.getItem('currentUser')));
        if (currentUser && currentUser.access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer '.concat(currentUser.access_token);
                }
            });
        }

        return next.handle(request);
    }
}
