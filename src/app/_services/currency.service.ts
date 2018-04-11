import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import { CurrencyResult, LineChartResult } from '../_models/index';
import { Environment } from '../environments/index';


@Injectable()
export class CurrencyService {
  private environment: Environment;
  private httpOptions: object;

  constructor(private http: HttpClient) {
      this.environment = new Environment();
      this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
  }

  public getCurrencyList() {
      return this.http.get<CurrencyResult>(this.environment.api.CURRENCY_LIST_URL, this.httpOptions);
  }

  public searchForCurrency(currencyString) {
      return this.http.get<CurrencyResult>(this.environment.api.CURRENCY_SEARCH_URL + '?search=' + currencyString, this.httpOptions);
  }

  public getNextPrevious(queryString) {
      return this.http.get<CurrencyResult>(queryString, this.httpOptions);
  }

  public getLineChart(chart: number, startDate: number) {
      return this.http.get<LineChartResult>(this.environment.api.CURRENCY_LINE_CHART_URL + chart + "/?time=" + startDate, this.httpOptions);
  }
}
