import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-currency-basket',
  templateUrl: './currency-basket.component.html',
  styleUrls: ['./currency-basket.component.scss']
})
export class CurrencyBasketComponent implements OnInit {
  data: { message: string, action: string };

  constructor(@Inject(MAT_SNACK_BAR_DATA) data: any) {
    this.data = data;
  }

  ngOnInit() {
  }

}
