import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup } from '@angular/forms';
import * as exampleData from '../../assets/OpenAPIScripMaster1.json';
@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.scss'],
    standalone: false
})
export class StockComponent implements OnInit {
  stockForm!: FormGroup
  stockData: any;
  selectedStock: any;
  selectedMode: any;
  selectedExchange: any;
  result: any
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.stockData = JSON.parse(JSON.stringify(exampleData));
    this.stockData= Object.keys(this.stockData).map(e=>this.stockData[e]);

    this.stockData.forEach((element: any) => {
      console.log(element);
    });

    this.selectedExchange = "NSE";
    this.selectedMode = "FULL";

  }

  onSubmit() {
    this.dataService.getStockDetailsByMode(this.selectedMode, this.selectedExchange, this.selectedStock.token, this.selectedStock.name);
  }

  onStockChange(event: any) {
    this.selectedStock = event;
    console.log("this.selectedExchange : ", this.selectedExchange);
    this.dataService.getStockDetailsByMode(this.selectedMode, this.selectedExchange, event.value.token, event.value.name)
    .then( (response) => {
      console.log('response :', response);
      console.log('response.data.data.fetched[0] :', response.data.data.fetched[0]);
      this.result =  response.data.data.fetched[0];
    })
    .catch(function (error) {
      console.log(error);
    });
    // this.result = JSON.parse(JSON.stringify(this.result));
    console.log('stock :: this.result : ', this.result);
  }

}
