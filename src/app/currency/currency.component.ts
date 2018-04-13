import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Observable } from 'rxjs/Observable';
import { AlertService, CurrencyService } from '../_services/index';
import { Currency, CurrencyHistory, CurrencyResult, GenericResponse } from '../_models/index';
import { SearchComponent } from '../search/index';
import { CurrencyBasketComponent } from '../currency-basket/index';
import { Router} from '@angular/router';
import { Environment } from '../environments/index';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  private currencyHistoryChart: CurrencyHistory[];
  private currencyResult: CurrencyResult = new CurrencyResult();
  private currencyBasket: Currency[] = [];
  private isLoadingResults: boolean = true;
  private nextSet: string;
  private previousSet: string;
  private align: string = 'start';
  private environment: Environment;


  constructor(private currencyService: CurrencyService,
              public snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() : void {
    this.isLoadingResults = true;
    this.currencyService.getCurrencyList()
    .subscribe(
        ( currencyResult : CurrencyResult) => {
          this.currencyResult = currencyResult;
          this.nextSet = this.currencyResult.next;
          this.previousSet = this.currencyResult.previous;
          this.isLoadingResults = false;
        },
        ( errorResponse: GenericResponse ) => {
          this.isLoadingResults = false;
          console.log(errorResponse);
    });

  }

  private createFund() : void {
    this.environment = new Environment();
    this.router.navigate([this.environment.global.WEIGHT_BASKET_URL]);
  }

  private findObjectByKey(array, key, value) : Currency {
      for (var i = 0; i < array.length; i++) {
          if (array[i][key] === value) {
              return array[i];
          }
      }
      return null;
  }

  private currencyCheckBoxClicked(event, currencyId) : void {
    if (event.checked == true) {
      var index = this.currencyBasket.indexOf(currencyId);
      if (index == -1) {
        this.currencyBasket.push(this.findObjectByKey(this.currencyResult.results, 'id', currencyId));
        this.snackBar.openFromComponent(CurrencyBasketComponent, {
          data: {message: this.currencyBasket, action: "None"},
          verticalPosition: 'top',
          duration: 2000
        });
      }
    }

    if (event.checked == false) {
      var index = this.currencyBasket.indexOf(currencyId);
      if (index > -1) {
          this.currencyBasket.splice(index, 1);
          this.snackBar.openFromComponent(CurrencyBasketComponent, {
            data: this.currencyBasket,
            verticalPosition: 'top',
            duration: 2000
          });
      }
    }
  }

  private next() : void {

    this.currencyService.getNextPrevious(this.nextSet)
    .subscribe(
        ( currencyResult : CurrencyResult) => {
          this.currencyResult = currencyResult;
          this.nextSet = this.currencyResult.next;
          this.previousSet = this.currencyResult.previous;
          this.isLoadingResults = false;
        },
        ( errorResponse: GenericResponse ) => {
          this.isLoadingResults = false;
          console.log(errorResponse);
    });
  }

  private previous() : void {
     this.currencyService.getNextPrevious(this.previousSet)
      .subscribe(
          ( currencyResult : CurrencyResult) => {
            this.currencyResult = currencyResult;
            this.nextSet = this.currencyResult.next;
            this.previousSet = this.currencyResult.previous;
            this.isLoadingResults = false;
          },
          ( errorResponse: GenericResponse ) => {
            this.isLoadingResults = false;
            console.log(errorResponse);
      });
    }
}
