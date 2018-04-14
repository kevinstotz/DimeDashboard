import { Component, OnInit } from '@angular/core';
import { Currency, GenericResponse, FundPreview, FundLineChart } from '../_models/index';
import { DataStorageService, DimeService } from '../_services/index';
import { Environment } from '../environments/index';


@Component({
  selector: 'app-preview-fund',
  templateUrl: './preview-fund.component.html',
  styleUrls: ['./preview-fund.component.scss']
})
export class PreviewFundComponent implements OnInit {
  private fundPreview: FundPreview[];
  private fundLineChart: FundLineChart[] =  [ ];

  constructor(private dataStorageService: DataStorageService,
              private dimeService: DimeService) {
    this.fundPreview = [];
    let currencies = <Currency[]>JSON.parse(dataStorageService.getItem('fundBasket'));

    for (let i=0; i < currencies.length; i++) {
      this.fundPreview[i] = new FundPreview();
      this.fundPreview[i].currencyId = currencies[i].id;
      this.fundPreview[i].percent = 1.0 / currencies.length;
    }
    this.dimeService.getFundPreview(this.fundPreview)
      .subscribe(
        ( fundLineChart : FundLineChart[] ) => {
          this.fundLineChart = fundLineChart;
        },
        ( errorResponse: GenericResponse ) => {
          console.log(errorResponse);
        }
    );
  }

  ngOnInit() {
  }

}
