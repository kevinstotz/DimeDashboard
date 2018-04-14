import { Component, OnInit, Input } from '@angular/core';
import { Currency } from '../_models/index';
import { DataStorageService } from '../_services/index';


@Component({
  selector: 'app-weight-fund',
  templateUrl: './weight-fund.component.html',
  styleUrls: ['./weight-fund.component.scss']
})
export class WeightFundComponent implements OnInit {
  public fundBasket: Currency[];

  constructor(private dataStorageService: DataStorageService) {
    this.fundBasket = <Currency[]>JSON.parse(dataStorageService.getItem('fundBasket'));
  }

  ngOnInit() {
  }

}
