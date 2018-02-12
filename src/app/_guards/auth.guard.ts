import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Environment } from '../environments/index';
import { CookieService, CookieOptions } from 'ngx-cookie';
import { Authentication } from '../_models/index';

@Injectable()
export class AuthGuard implements CanActivate {
    private userCookie: String;
    private environment: Environment;

    constructor(
        private router: Router,
        private _cookieService: CookieService) {
            this.environment = new Environment();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.userCookie = this._cookieService.get('currentUser');
        console.log(this.userCookie);
        if (this.userCookie) {
          localStorage.setItem('currentUser', JSON.stringify(this.userCookie));
          sessionStorage.setItem('currentUser', JSON.stringify(this.userCookie));
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        //this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        window.location.href=this.environment.global.WEBSITE_URL;
        return false;
    }
}
