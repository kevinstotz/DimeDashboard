import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Observable } from 'rxjs/Observable';
import { AlertService, CurrencyService } from '../_services/index';
import { Currency, CurrencyHistory, CurrencyResult } from '../_models/index';
import { SearchComponent } from '../search/index';
import { CurrencyBasketComponent } from '../currency-basket/index';


@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  private currencyHistoryChart: CurrencyHistory[];
  private currencyResult: CurrencyResult = new CurrencyResult();
  private currencies: Currency[];
  private currencyModel: Currency;
  private currencyBasket: number[] = new Array();
  private isLoadingResults: boolean = true;
  private nextSet: string;
  private previousSet: string;
  private align: string = 'start';

  constructor(private currencyService: CurrencyService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.isLoadingResults = true;
    // If the user changes the sort order, reset back to the first page.
    this.currencyService.getCurrencyList()
    .subscribe(
        ( data : CurrencyResult) => {
          this.currencyResult = data;
          this.nextSet = this.currencyResult.next;
          this.previousSet = this.currencyResult.previous;
          this.isLoadingResults = false;
        },
        errorResponse => {
          this.isLoadingResults = false;
          console.log(errorResponse);
    });

  }

  private addToFund() : void {

  }

  private currencyCheckBoxClicked(event, currencyId) : void {
    if (event.checked == true) {
      var index = this.currencyBasket.indexOf(currencyId);
      if (index == -1) {
        this.currencyBasket.push(currencyId);
        let data = [];
        for (let i in this.currencyBasket) {
            data.push(this.currencyResult.results[i]);
        }
        this.snackBar.openFromComponent(CurrencyBasketComponent, {
          data: data,
          verticalPosition: 'top',
          duration: 2000
        });
      }
    }

    if (event.checked == false) {
      var index = this.currencyBasket.indexOf(currencyId);
      let data = [];
      for (let i in this.currencyBasket) {
          data.push(this.currencyResult.results[i]);
      }
      if (index > -1) {
          this.currencyBasket.splice(index, 1);
          this.snackBar.openFromComponent(CurrencyBasketComponent, {
            data: data,
            verticalPosition: 'top',
            duration: 2000
          });
      }
    }
  }

  private next() : void {

    this.currencyService.getNextPrevious(this.nextSet)
    .subscribe(
        ( data : CurrencyResult) => {
          this.currencyResult = data;
          this.nextSet = this.currencyResult.next;
          this.previousSet = this.currencyResult.previous;
          this.isLoadingResults = false;
        },
        errorResponse => {
          this.isLoadingResults = false;
          console.log(errorResponse);
    });
  }

  private previous() : void {
     this.currencyService.getNextPrevious(this.previousSet)
      .subscribe(
          ( data : CurrencyResult) => {
            this.currencyResult = data;
            this.nextSet = this.currencyResult.next;
            this.previousSet = this.currencyResult.previous;
            this.isLoadingResults = false;
          },
          errorResponse => {
            this.isLoadingResults = false;
            console.log(errorResponse);
      });
    }
}
