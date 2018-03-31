import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AlertService, DimeService } from '../_services/index';
import { DimeTableListChart } from '../_models/index';
import { NgIf } from '@angular/common';
import { DivisionPipe } from '../_helpers/index';

@Component({
  selector: 'app-dimetable',
  templateUrl: './dimetable.component.html',
  styleUrls: ['./dimetable.component.scss']
})
export class DimetableComponent implements OnInit {
  private dimeTableListChart: DimeTableListChart[];
  private resultsLength: number = 0;
  private isLoadingResults: boolean = true;
  private isRateLimitReached: boolean = false;

  constructor(private dimeService: DimeService) { }

  ngOnInit() {
    this.isLoadingResults = true;
    // If the user changes the sort order, reset back to the first page.
    this.dimeService.getTableListChart(153)
    .subscribe(
        ( data : DimeTableListChart[]) => {
          this.dimeTableListChart = data ;
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          //this.resultsLength = data.total_count;
        },
        errorResponse => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          console.log(errorResponse);
    });
  }

}
