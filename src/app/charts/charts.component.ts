import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
  standalone: false
})
export class ChartsComponent implements OnChanges{
  
  private newLabel? = 'New label';
  @Input() stocksChartData: any;

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
          let change = changes[propName];
          switch (propName) {
          case 'stocksChartData': {
            console.log('change.currentValue : ', change.currentValue)
            console.log('stocksChartData :', this.stocksChartData);
            let chartLabels: any[] = [];
            let closingBalanceData: any[] = [];
            let openingBalanceData: any[] = [];
            let changeData: any[] = [];
            this.stocksChartData.forEach((element: any) => {
              chartLabels.push(element[0]);
              openingBalanceData.push(element[1]);
              closingBalanceData.push(element[4]);
              changeData.push(element[7]);
            });
            this.lineChartData.datasets[0].data = closingBalanceData;
            this.lineChartData.datasets[1].data = openingBalanceData;
            this.lineChartData.datasets[2].data = changeData;
            this.lineChartData.labels = chartLabels;
            this.chart?.hideDataset(1, true);
            this.chart?.hideDataset(2, true);
          }
        }
      }
    }
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Closing Balance',
        backgroundColor: 'rgba(228, 126, 138, 0.2)',
        borderColor: 'rgb(224, 110, 110)',
        pointBackgroundColor: 'rgb(255, 0, 0)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(219, 87, 89, 0.8)',
        fill: 'origin',
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Opening Balance',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [180, 480, 770, 90, 1000, 270, 400],
        label: 'Differernce',
        yAxisID: 'y1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
      // annotation: {
      //   annotations: [
      //     {
      //       type: 'line',
      //       scaleID: 'x',
      //       value: 'March',
      //       borderColor: 'orange',
      //       borderWidth: 2,
      //       label: {
      //         display: true,
      //         position: 'center',
      //         color: 'orange',
      //         content: 'LineAnno',
      //         font: {
      //           weight: 'bold',
      //         },
      //       },
      //     },
      //   ],
      // },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    // console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    // console.log(event, active);
  }

  public toggleChartSeries(chartInedex: number): void {
    const isHidden = this.chart?.isDatasetHidden(chartInedex);
    this.chart?.hideDataset(chartInedex, !isHidden);
  }

}
