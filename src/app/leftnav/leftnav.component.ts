import { Component, OnInit } from '@angular/core';
import { LeftnavitemComponent } from '../_directives/index';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss']
})
export class LeftnavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
