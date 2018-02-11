import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/index';

@Component({
  moduleId: 'module.id',
  selector: 'app-header',
  templateUrl: '/./header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  private isUserLoggedIn: boolean;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
      this.isUserLoggedIn = this.authenticationService.isLoggedIn();
  }

}
