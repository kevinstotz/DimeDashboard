import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { Currency } from  '../_models/index';
import { DataStorageService } from '../_services/index';


@Component({
  selector: 'app-currency-basket',
  templateUrl: './currency-basket.component.html',
  styleUrls: ['./currency-basket.component.scss']
})
export class CurrencyBasketComponent implements OnInit {
  public currencies: { message: Currency[], action: string };

  constructor(@Inject(MAT_SNACK_BAR_DATA) data: any,
              private dataStorageService: DataStorageService) {

    this.currencies = data;
    dataStorageService.setItem('fundBasket', this.currencies.message);
  }

  ngOnInit() {
  }

}
