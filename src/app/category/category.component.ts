import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import * as allStocksJsonFile from '../../assets/OpenAPIScripMaster.json';
 
@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  stockForm!: FormGroup
  stockData: any;
  selectedStock: any;
  selectedInterval: any;
  selectedExchange: any;
  selectedFromDate: any;
  selectedToDate: any;
  result: any
  categoriesList: any;
  categoriesKeys: any;
  allStocksData: any[] = [];
  constructor(private dataService: DataService) { 
    this.allStocksData = JSON.parse(JSON.stringify(allStocksJsonFile)).default;
    
  }

  ngOnInit(): void {
    this.selectedExchange = "NSE";
    this.selectedInterval = "FULL";

    
    this.dataService.getCategoriesList().subscribe(res => {
      console.log('result: ', res);
      this.categoriesList = res;
      this.categoriesKeys = Object.keys(this.categoriesList);
    })
  }

formatDate(date: Date) {
  let datePart = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ].map((n, i) => n.toString().padStart(i === 0 ? 4 : 2, "0")).join("-");
  let timePart = [
    date.getHours(),
    date.getMinutes()
    // date.getSeconds()
  ].map((n, i) => n.toString().padStart(2, "0")).join(":");
  return datePart + " " + timePart;
}

  onSubmit() {
    this.getData();
  }

  getData() {
    this.dataService.getHistoricalStockDetails(this.selectedExchange, this.selectedStock, this.selectedInterval,
      this.formatDate(new Date(this.selectedFromDate)), this.formatDate(new Date(this.selectedToDate)) )
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
  onStockChange(event: any) {
    this.selectedStock = event.value;
    

  }

  export() {
    this.getData();
    let items = [...this.result];
    items.unshift(['Date', 'Open', 'High', 'Low', 'Close', 'Volume', 'Change', 'Change%']);
    // const items = this.result.items
const replacer = (key: any, value: any) => value === null ? '' : value // specify how you want to handle null values here
const header = Object.keys(items[0])
const csv = [
  header.join(','), // header row first
  ...items.map((row:any) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
].join('\r\n')
let selectedStockName = '';
this.stockData.forEach((element: any) => {
  if(element.token == this.selectedStock) {
    selectedStockName = element.name;
  }
});
let fileName = selectedStockName + ".CSV";
let fileContent = csv;

const file = new Blob([fileContent], { type: "text/plain"});
const link = document.createElement('a');
link.href = URL.createObjectURL(file);
link.download = fileName;
link.click();
link.remove();

}

categorySelected(event: any) {
  console.log('event : ', event);
  console.log('this.categoriesList : ', this.categoriesList[event]?.split());
  let tempCategoiesList = this.categoriesList[event]?.split(',');
  let tempStockToken = '';

  tempCategoiesList.forEach((tempStock: any) => {
    console.log('temp element :', tempStock);

    this.allStocksData.forEach((element: any) => {
      if(element.symbol == tempStock) {
        console.log('Stock Found : ', element);
        tempStockToken = element.token;
      }
      
    });

     this.dataService.getStockDetailsByMode("LTP",this.selectedExchange, tempStockToken, tempStock)
     .subscribe(
       (response: any) => {
         console.log('response :', response);
       },
       (error: any) => {
         console.log(error);
       }
     );
  });

}


}
