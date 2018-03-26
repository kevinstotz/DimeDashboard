import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AlertService, HistoryService } from '../_services/index';
import { History } from '../_models/index';

@Component({
    selector: 'app-history',
    moduleId: 'module.id',
    templateUrl:'./history.component.html'
})

export class HistoryComponent implements OnInit {
  private historyChart: History[];
  private resultsLength: number = 0;
  private isLoadingResults: boolean = true;
  private isRateLimitReached: boolean = false;

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
    this.isLoadingResults = true;
    // If the user changes the sort order, reset back to the first page.
    this.historyService.getHistory()
    .subscribe(
        ( data : History[]) => {
          this.historyChart = data ;
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
