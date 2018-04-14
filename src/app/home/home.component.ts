import { Component, OnInit } from '@angular/core';
import { LeftnavComponent } from '../leftnav/index'
import { DimeService } from '../_services/index';
import { GenericResponse, Fund } from '../_models/index';
import { NgForOf, PercentPipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public coins: Array<Fund>;

  constructor(private dimeService: DimeService) { }

  ngOnInit() {
    this.dimeService.getPieChart(153)
    .subscribe(
        ( fund: Fund[] ) => {
           this.coins = [];
           for (var i of fund ) {
                this.coins.push(i);
           }
        },
        ( errorResponse: GenericResponse ) => {
          console.log(errorResponse);
    });
  }

}
