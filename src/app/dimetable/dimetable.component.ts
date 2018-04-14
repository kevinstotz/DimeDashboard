import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AlertService, DimeService } from '../_services/index';
import { FundTableListChart, GenericResponse } from '../_models/index';
import { NgIf } from '@angular/common';
import { DivisionPipe } from '../_helpers/index';

@Component({
  selector: 'app-dimetable',
  templateUrl: './dimetable.component.html',
  styleUrls: ['./dimetable.component.scss']
})
export class DimetableComponent implements OnInit {
  private fundTableListChart: FundTableListChart[];
  private isLoadingResults: boolean = true;

  constructor(private dimeService: DimeService) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.dimeService.getTableListChart(153)
    .subscribe(
        ( data : FundTableListChart[]) => {
          this.fundTableListChart = data ;
          this.isLoadingResults = false;
        },
        ( errorResponse: GenericResponse) => {
          this.isLoadingResults = false;
          console.log(errorResponse);
    });
  }

}
