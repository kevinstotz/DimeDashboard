import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../_services/index';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private alertService: AlertService) { }

  ngOnInit() {
      this.alertService.success('Page Not Found successful', true);
  }

}
