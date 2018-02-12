import { Component, OnInit } from '@angular/core';
import { Environment } from '../environments/index';
import { AuthenticationService } from '../_services/index';
import { Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
    private environment: Environment;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router) {
            this.environment = new Environment();
        }

    ngOnInit() {
        this.authenticationService.logout();
        window.location.href=this.environment.global.WEBSITE_URL;
    }

}
