import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';
import { User, Authentication } from '../_models/index';
import { GlobalVariable } from '../globals/index';

@Component({
    moduleId: 'module.id',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    private user = new User();
    private loading = false;
    private returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['dashboard'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.user.username, this.user.password)
            .subscribe(
                  (authenticationResponse: Authentication) => {
                    this.router.navigate([GlobalVariable.DASHBOARD_URL]);
                    this.loading = false;
                },
                error => {
                    console.log(error);
                    this.alertService.error(error.error.error_description);
                    this.loading = false;
                });
    }
}
