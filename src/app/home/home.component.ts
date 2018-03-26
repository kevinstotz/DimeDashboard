import { Component, OnInit } from '@angular/core';
import { LeftnavComponent } from '../leftnav/index'
import { DimeService } from '../_services/index';
import { NgForOf, PercentPipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private coins: object[] = [];

  constructor(private dimeService: DimeService) { }

  ngOnInit() {
    this.coins = [];
    this.dimeService.getPieChart()
    .subscribe(
        data => {
           for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                this.coins.push(obj);
                //items[i] = +obj.value;
                //labels[i] = String(obj.name);
           }
        },
        errorResponse => {
          console.log(errorResponse);
    });

  }

}
