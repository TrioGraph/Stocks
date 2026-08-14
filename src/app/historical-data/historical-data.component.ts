import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import * as exampleData from '../../assets/OpenAPIScripMaster1.json';
// import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-historical-data',
  standalone: false,
  templateUrl: './historical-data.component.html',
  styleUrl: './historical-data.component.scss',
})
export class HistoricalDataComponent {
  stockForm!: FormGroup;
  stockData: any;
  selectedStock: any;
  selectedInterval: any;
  selectedFromDate: any;
  selectedToDate: any;
  result: any;
  allStocksData: any;

  _itemTrigger: any;
  selectedMode: any;
  get itemTrigger(): string {
    return this._itemTrigger;
  }
  set itemTrigger(v: string) {
    this._itemTrigger = v;
  }

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.stockData = exampleData;
    this.stockData = JSON.parse(JSON.stringify(exampleData)).default;
    this.selectedInterval = 'TEN_MINUTE';
    this.selectedMode = 'FULL';

    if(this.allStocksData){
      this.stockData = this.allStocksData;
    }
    else {
    this.dataService.getStocksLists(undefined).subscribe((result: any) => {
      this.allStocksData = result;
      this.stockData = result;
    });
  }

  var today = new Date();
var yesterday = new Date(today);
yesterday.setDate(today.getDate()-5);
yesterday.toLocaleDateString();

  this.selectedFromDate = this.formatDateFromProperty(yesterday);
    this.selectedToDate = this.formatDateFromProperty(today);
  }

  formatDateFromProperty(date: Date): string {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

  formatDate(date: Date) {
    let datePart = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
      .map((n, i) => n.toString().padStart(i === 0 ? 4 : 2, '0'))
      .join('-');
    let timePart = [
      date.getHours(),
      date.getMinutes(),
      // date.getSeconds()
    ]
      .map((n, i) => n.toString().padStart(2, '0'))
      .join(':');
    return datePart + ' ' + timePart;
  }

  onSubmit() {
    this.getData();
  }

  getData() {
    this.dataService
      .getHistoricalStockDetails(
        this.selectedStock.exch_seg,
        this.selectedStock.token,
        this.selectedInterval,
        this.formatDate(new Date(this.selectedFromDate)),
        this.formatDate(new Date(this.selectedToDate))
      )
      .subscribe(
        (response: any) => {
          this.result = response.data;
          let previousClosedValue = 0;
          this.result.forEach((el: any) => {
            el[el.length] = el[4] - previousClosedValue;
            el[el.length] = ((el[4] - previousClosedValue) / previousClosedValue) * 100;
            previousClosedValue = el[4];
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  onStockChange(stockObj: any) {
    this.result = undefined;
    this.selectedStock = stockObj;
    this.itemTrigger = stockObj;
    console.log('onStockChange Called');
    this.selectedStock = stockObj;
  }

  onKey(event: any) {
    console.log('onKey event : ', event.target.value);
    this.search(event.target.value);
  }

  search(value: string) {
    if (this.allStocksData) {
      this.stockData = this.allStocksData.filter((a: any) => {
        return (
          a.symbol.toLocaleLowerCase().includes(value.toLowerCase()) &&
          (a.exch_seg === 'NSE' || a.exch_seg === 'BSE')
        );
      });
    } else {
      this.allStocksData = this.dataService.getStocksLists(value);
      this.stockData = this.allStocksData.filter((a: any) => {
        return (
          a.symbol.toLocaleLowerCase().includes(value.toLowerCase()) &&
          (a.exch_seg === 'NSE' || a.exch_seg === 'BSE')
        );
      });
    }
    }

  export() {
    this.getData();
    let items = [...this.result];
    items.unshift([
      'Date',
      'Open',
      'High',
      'Low',
      'Close',
      'Volume',
      'Change',
      'Change%',
    ]);
    // const items = this.result.items
    const replacer = (key: any, value: any) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(items[0]);
    const csv = [
      header.join(','), // header row first
      ...items.map((row: any) =>
        header
          .map((fieldName) => JSON.stringify(row[fieldName], replacer))
          .join(',')
      ),
    ].join('\r\n');
    let selectedStockName = '';
    this.stockData.forEach((element: any) => {
      if (element.token == this.selectedStock) {
        selectedStockName = element.name;
      }
    });
    let fileName = selectedStockName + '.CSV';
    let fileContent = csv;

    const file = new Blob([fileContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = fileName;
    link.click();
    link.remove();
  }
}
