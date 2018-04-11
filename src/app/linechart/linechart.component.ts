import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { AlertService, CurrencyService } from '../_services/index';
import { LineChartItem, LineChartResult } from '../_models/index';
import { Environment } from '../environments/index';


@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})

export class LineChartComponent implements OnInit {
  @Input() currencyId: number = 0;
  private startDate: number;
  private lineChart : Chart;
  private isLoading: boolean = true;
  private environment: Environment;
  public displayData : Object = { };
  private lineLabels : any[] = [];
  private lineData : number[] = [];

  private lineOptions : object = {
     maintainAspectRatio: false,
     legend: false,
     defaultFontSize: 6,
     title: {
       display: false,
         text: 'Composition of The Fund'
     },
     scales: {
          xAxes: [
             {
               type: 'time',
               distribution: 'series',
               time: {
                    unit: 'week',
                    displayFormats: {
                        week:	'MMM D'
                      }
                    }
              }
            ],
          yAxes: [
            {
              ticks: {
                    callback: function(label, index, labels) {
                        return '$'+label;
                    }
                },
                scaleLabel: {
                    display: false,
                    labelString: 'Net Asset Value'
                }
            }
          ]
     },
     tooltips: {
       xPadding: 8,
       yPadding: 8,
       borderWidth: 2,
       intersect: false,
       callbacks: {
                label: function(tooltipItem, data) {
                  var value = parseFloat(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
                  return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                },

                labelColor: function(tooltipItem, chart) {
                    return {
                        borderColor: 'rgb(255, 255, 0)',
                        backgroundColor: 'rgb(255, 255, 0)'
                    }
                },
                labelTextColor:function(tooltipItem, chart){
                    return '#FFF';
                },
                footer: function(tooltipItem, data) {
                  return;
                }
        }
     }
  };

  private lineDataObject : object = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            data: '',
            label: 'label',
            borderColor: "#21b082",
            fill: false
        }]
     },
     options: this.lineOptions
  };


  constructor(private currencyService: CurrencyService) {
    this.environment = new Environment();
    var now = new Date(new Date().setUTCHours(0,0,0,0));
    this.startDate = (now.valueOf() / 1000) - (60 * 60 * 24 * 30);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    var dateLabels : Date[] = [];
    var pointBackgroundColors = [];
    var pointHoverRadius = [];
    var pointRadius = [];

    this.currencyService.getLineChart(this.currencyId, this.startDate)
      .subscribe(
          ( lineChartResult : LineChartResult) => {
            if (!lineChartResult.count || lineChartResult.count <= 0) { return; }
            let lineChartItem: LineChartItem;

            for (var i = 0; i < lineChartResult.count; i++) {
                lineChartItem = lineChartResult.results[i];
                var dt = new Date("0 UTC");
                dt.setUTCSeconds(+lineChartItem.name);
                dateLabels[i] = dt;
                this.lineData[i]  = lineChartItem.value;
                pointBackgroundColors[i]= "#BE0081";
                pointHoverRadius[i] = 3;
                pointRadius[i] = 1;
            }

            this.lineDataObject['data']['labels'] = dateLabels;
            this.lineDataObject['data']['datasets'] = [
                { data: this.lineData,
                  pointRadius: pointRadius,
                  pointHoverRadius: pointHoverRadius,
                  pointBackgroundColor: pointBackgroundColors,
                  borderColor: "#21b082",
                  fill: false }
            ];
            this.lineChart = new Chart('line-chart-' +this.currencyId, this.lineDataObject ) ;
            this.isLoading = false;
          },
          errorResponse => {
            console.log(errorResponse);
          }
      );
  }

}
