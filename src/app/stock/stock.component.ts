import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup } from '@angular/forms';
import * as exampleData from '../../assets/OpenAPIScripMaster.json';
import { MatOptionSelectionChange } from '@angular/material/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatSelect } from '@angular/material/select';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockComponent implements OnInit, AfterViewInit {
  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);

  stockForm!: FormGroup;
  allStocksData: any;
  stocksData: any;
  selectedStock: any;
  selectedMode: any;
  selectedExchange: any;
  result: any;
  dropDownHeight = 5;

  _itemTrigger: any;
  get itemTrigger(): string {
    return this._itemTrigger;
  }
  set itemTrigger(v: string) {
    this._itemTrigger = v;
  }

  constructor(
    public _cdr: ChangeDetectorRef,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // this.allStocksData = exampleData;
    // this.allStocksData = JSON.parse(JSON.stringify(exampleData)).default;
    // this.allStocksData.forEach((element: any) => {
    //   console.log(element);
    // });
    if(this.allStocksData){
      this.stocksData = this.allStocksData;
    }
    else {
    this.dataService.getStocksLists(undefined).subscribe((result: any) => {
      this.allStocksData = result;
      this.stocksData = result;
    });
  }
    // this.stocksData = [...this.allStocksData];
    this.selectedExchange = 'NSE';
    this.selectedMode = 'FULL';
  }
  ngAfterViewInit() {}

  onSubmit() {
    this.dataService.getStockDetailsByMode(
      this.selectedMode,
      this.selectedExchange,
      this.selectedStock.token,
      this.selectedStock.name
    );
  }

  openChange($event: boolean) {
    console.log('open change', $event);
    if ($event) {
    }
  }

  onStockChange(event: any) {
    this.result = undefined;
    this.selectedStock = event.source.value;
    this.itemTrigger = event.source.value;
    console.log('onStockChange Called');
    this.dataService
      .getStockDetailsByMode(
        this.selectedMode,
        this.selectedExchange,
        event.source.value.token,
        event.source.value.name
      )
      .subscribe(
        (response: any) => {
          const fetched = response?.data?.data?.fetched ?? response?.data?.fetched ?? response?.fetched;
          this.result = fetched ? fetched[0] : undefined;
        },
        (error: any) => {
          console.log(error);
        }
      );
      
  }

  onKey(event: any) {
    console.log('onKey event : ', event.target.value);
    this.search(event.target.value);
  }

  search(value: string) {
    if(this.allStocksData){
      this.stocksData = this.allStocksData.filter((a: any) => {
        return a.symbol.toLocaleLowerCase().includes(value.toLowerCase()) 
        && (a.exch_seg === 'NSE' || a.exch_seg === 'BSE')
      });
    }
    else {
      this.allStocksData = this.dataService.getStocksLists(value)
      this.stocksData = this.allStocksData.filter((a: any) => {
        return a.symbol.toLocaleLowerCase().includes(value.toLowerCase()) 
        && (a.exch_seg === 'NSE' || a.exch_seg === 'BSE')
      });
    }
    // this.dataService.getStocksLists(value).subscribe((results: any) => {
    //   console.log('Inside Search results : ', results);
    //   var filterData = results.filter((str: any) => {
    //     return str.symbol
    //       .toLocaleLowerCase()
    //       .includes(value.toLocaleLowerCase());
    //   });
    //   console.log('filterData : ', filterData);
    //   this.stocksData = filterData;
    //   console.log('this.stocksData : ', this.stocksData);
    // });
    // this.stocksData = this.allStocksData.filter((option: any) => option.symbol.includes(value));
  }
}
