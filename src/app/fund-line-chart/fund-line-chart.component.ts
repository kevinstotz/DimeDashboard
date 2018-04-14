import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FundLineChart } from '../_models/index';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-fund-line-chart',
  templateUrl: './fund-line-chart.component.html',
  styleUrls: ['./fund-line-chart.component.scss']
})
export class FundLineChartComponent implements OnInit {
  @Input() fundlinechartdata: FundLineChart[];
  private lineChart : Chart;
  public displayData : Object = { name: "kevin", value: 94, timestamp: 43 };
  private lineData : number[] = [];

  private lineOptions : object = {
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
                  displayFormats: {
                      day: 'MMM D'
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
                  display: true,
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
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var dateObject = new Date(data['labels'][tooltipItem.index]);
                var value = 100.0 * parseFloat(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
                let t:string = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return dateObject.getDate() + ' -> $'+ t;
              },
              title: function(tooltipItem, data) {
                  return;
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

ngOnChanges() {
  if (this.lineChart) {
    var dateLabels : any[] = [];
    let fundLineChart: FundLineChart;
    for (var i = 0; i < this.fundlinechartdata.length; i++) {
      fundLineChart = this.fundlinechartdata[i];
      dateLabels[i] = new Date(fundLineChart.name * 1000);
      this.lineData[i] = fundLineChart.value;
    }
    this.lineDataObject['data']['labels'] = dateLabels;
    this.lineDataObject['data']['datasets'] = [{ data: this.lineData, label: 'My Fund', borderColor: "#21b082", fill: false }];
    this.lineChart.update();
  }
}

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


ngOnInit() {
}

constructor() {}

ngAfterViewInit() {
  var dateLabels : any[] = [];
  var pointBackgroundColors = [];
  var pointHoverRadius = [];
  var pointRadius = [];

  let fundLineChart: FundLineChart;
  if (!this.fundlinechartdata) {return;}
  for (var i = 0; i < this.fundlinechartdata.length; i++) {
      fundLineChart = this.fundlinechartdata[i];
      dateLabels[i] = new Date(fundLineChart.name * 1000);
      this.lineData[i] = fundLineChart.value;
      pointBackgroundColors[i]= "#BE0081";
      pointHoverRadius[i] = 8;
      pointRadius[i] = 3;

  }

  this.lineDataObject['data']['labels'] = dateLabels;
  this.lineDataObject['data']['datasets'] = [{ data: this.lineData, pointRadius: pointRadius, pointHoverRadius: pointHoverRadius, pointBackgroundColor: pointBackgroundColors, label: 'My Fund', borderColor: "#21b082", fill: false }];
  this.lineChart = new Chart('line-chart', this.lineDataObject );
}

}
