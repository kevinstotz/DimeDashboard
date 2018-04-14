import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AlertService, HistoryService } from '../_services/index';
import { History, GenericResponse } from '../_models/index';

@Component({
    selector: 'app-history',
    moduleId: 'module.id',
    templateUrl:'./history.component.html'
})

export class HistoryComponent implements OnInit {
  private historyChart: History[];
  private isLoadingResults: boolean = true;

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
    this.isLoadingResults = true;
    // If the user changes the sort order, reset back to the first page.
    this.historyService.getHistory()
    .subscribe(
      ( history : History[]) => {
        this.historyChart = history ;
        this.isLoadingResults = false;
      },
      ( errorResponse: GenericResponse ) => {
        this.isLoadingResults = false;
        console.log(errorResponse);
      }
    );
  }

}
