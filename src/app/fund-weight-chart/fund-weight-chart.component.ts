import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Currency, RebalancePeriods, GenericResponse } from '../_models/index';
import { Chart } from 'chart.js';
import { Environment } from '../environments/index';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { DimeService } from '../_services/index';
import { Router} from '@angular/router';


@Component({
  selector: 'app-fund-weight-chart',
  templateUrl: './fund-weight-chart.component.html',
  styleUrls: ['./fund-weight-chart.component.scss']
})
export class FundWeightChartComponent implements OnInit {
  @Input() currencies: Currency[];
  private data: {datasets, labels};
  private myPieChart: Chart;
  private options: Object;
  private parts: number[];
  private labels: string[];
  private backgroundColor: string[];
  private selectedAllocation: string;
  private allocationOptionsForm: FormGroup;
  private allocationOption: string[];
  private allocationOptions: object[];
  private rebalanceOption: string[];
  private rebalanceOptions: RebalancePeriods[];
  private environment: Environment;

  constructor(private formBuilder: FormBuilder,
              private dimeService: DimeService,
              private router: Router) {

    this.allocationOptions = [
      {id: 1, option: 'Equal'},
      {id: 2, option: 'Market Cap'}
    ];

     this.dimeService.getRebalancePeriods(0)
      .subscribe(
          ( rebalancePeriods : RebalancePeriods[]) => {
            this.rebalanceOptions = rebalancePeriods ;
          },
          ( errorResponse: GenericResponse ) => {
            console.log(errorResponse);
          }
      );
    this.backgroundColor = ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"];
  }

  ngOnInit() {
    this.allocationOptionsForm = this.formBuilder.group({
      allocationOption: new FormControl('', [Validators.required]),
      rebalanceOption: new FormControl('', [Validators.required])
    });
  }

  private ngAfterViewInit() : void {
    this.labels = [];
    this.parts = [];

    for (let coin in this.currencies) {
      this.parts.push(Math.round(1.0 / this.currencies.length * 100.0));
      this.labels.push(this.currencies[coin].name);
    }

    this.data = { datasets: [ { data: this.parts, backgroundColor: this.backgroundColor } ], labels: this.labels  };
    this.options = {
        cutoutPercentage: 30
    };

    this.myPieChart = new Chart('doughnut-chart', {
      type: 'doughnut',
      data: this.data,
      options: this.options
    });

  }

  private preview() {
    this.environment = new Environment();
    this.router.navigate([this.environment.global.PREVIEW_FUND_URL]);
  }

  private allocationChange(allocation) {
    switch (allocation.id) {
      case 1:
        this.parts = [];
        for (let coin in this.currencies) {
          this.parts.push(Math.round(1.0 / this.currencies.length * 100.0));
        }
        this.myPieChart.data.datasets[0].data = this.parts;
        this.myPieChart.update();
        break;
      case 2:
        this.parts = [];
        let market_cap_sum = 0;
        for (let coin in this.currencies) {
          market_cap_sum = market_cap_sum + this.currencies[coin].market_cap;
        }
        for (let coin in this.currencies) {
          this.parts.push(Math.round(this.currencies[coin].market_cap / market_cap_sum * 100.0));
        }
        this.myPieChart.data.datasets[0].data = this.parts;
        this.myPieChart.update();
        break;
      default:
        console.log(allocation.id);
      }
  }


}
