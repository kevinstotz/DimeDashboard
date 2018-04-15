import { Component, OnInit, Input } from '@angular/core';
import { Currency } from '../_models/index';
import { DataStorageService } from '../_services/index';
import { Router} from '@angular/router';
import { Environment } from '../environments/index';


@Component({
  selector: 'app-weight-fund',
  templateUrl: './weight-fund.component.html',
  styleUrls: ['./weight-fund.component.scss']
})
export class WeightFundComponent implements OnInit {
  public fundBasket: Currency[];
  private environment: Environment;

  constructor(private dataStorageService: DataStorageService,
              private router: Router) {
    this.fundBasket = <Currency[]>JSON.parse(dataStorageService.getItem('fundBasket'));
  }

  ngOnInit() {
  }
  
  private back() : void {
    this.environment = new Environment();
    this.router.navigate([this.environment.global.SELECT_COINS_FUND_URL]);
  }

  private previewFund() : void {
    this.environment = new Environment();
    this.router.navigate([this.environment.global.PREVIEW_FUND_URL]);
  }
}
