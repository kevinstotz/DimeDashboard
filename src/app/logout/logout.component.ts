import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../globals/index';
import { AuthenticationService } from '../_services/index';
import { Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit() {
        this.authenticationService.logout();
        window.location.href=GlobalVariable.WEBSITE_URL;
    }

}
