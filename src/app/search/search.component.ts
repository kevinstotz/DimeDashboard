import { Component, OnInit } from '@angular/core';
import { CurrencyResult, Currency } from '../_models/index';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators/map';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CurrencyService } from '../_services/index';


export class State {
    constructor(public name: string, public population: string, public flag: string) { }
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private currencyModel: Currency;
  private currencySearch: Currency[];
  private currencySearchChanged: Subject<string> = new Subject<string>();


  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit() {
    this.currencySearchChanged.pipe(debounceTime(600), distinctUntilChanged())
    .subscribe(
       ( searchString: string ) => {
         this.callSearch(searchString);
       },
       ( errorResponse: string ) => {
         console.log(errorResponse);
       }
    );
  }

  private searchChanged(currencyString: string) {
    this.currencySearchChanged.next(currencyString);
  }

  private callSearch(currencyString: string) {
    this.currencyService.searchForCurrency(currencyString)
    .subscribe(
       ( data: CurrencyResult ) => {
         console.log(data);
         this.currencySearch = data.results;
         return data.results;
       },
       ( errorResponse: string ) => {
         console.log(errorResponse);
       }
    );
  }
}
