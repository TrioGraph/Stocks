import { Component, inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle,} from '@angular/material/dialog';
import { DataService } from '../data.service';
import { StkDialogComponent } from '../stk-dialog/stk-dialog.component';
import { interval } from 'rxjs/internal/observable/interval';

@Component({
  selector: 'app-files',
  standalone: false,
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss',
})
export class FilesComponent implements OnInit {
  allStocks: any;
  list1: any = [];
  list2: any = [];
  selectedInterval: any;
  selectedFromDate: any;
  selectedToDate: any;
  
  readonly dialog = inject(MatDialog);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getStocksLists(undefined).subscribe((result: any) => {
      this.allStocks = result.filter((element: any) => {
        return element.exch_seg === 'NSE' || element.exch_seg === 'BSE';
      });
      this.list1 = this.allStocks;
    });

    this.dataService.getSavedStocks().subscribe(result=> {
      console.log('result[0] = ', result[0]);
      this.list2 = result[0];
    });
  }

  public toggleSelection(item: any, list: any) {
    if(item?.selected) {
      item.selected = item.selected === true ? false : true;  
    }
    else {
    item.selected = true;
    }
  }

  public moveSelected(direction: any) {
    if (direction === 'left') {
      this.list2.forEach((item: any) => {
        if (item.selected) {
          this.list1.push(item);
        }
      });
      this.list2 = this.list2.filter((i: any) => !i.selected);
    } else {
      this.list1.forEach((item: any) => {
        if (item.selected) {
          this.list2.push(item);
        }
      });
      this.list1 = this.list1.filter((i: any) => !i.selected);
    }
  }

  public moveAll(direction: any) {
    if (direction === 'left') {
      this.list1 = [...this.list1, ...this.list2];
      this.list2 = [];
    } else {
      this.list2 = [...this.list2, ...this.list1];
      this.list1 = [];
    }
  }

  onKey(event: any) {
    this.list1 = this.allStocks.filter((a: any) => {
      return (
        a.symbol.toLocaleLowerCase().includes(event.srcElement.value.toLowerCase()) &&
        (a.exch_seg === 'NSE' || a.exch_seg === 'BSE')
      );
    });
  }

  saveToFile() {
    let formData: any;
    formData = this.list2;
    // formData.id = 1;
    console.log('formData : ', formData);
    this.dataService.saveToFile(formData).subscribe((result: any) => {
      console.log('result');
      this.openDialog('3000ms', '500ms');
    })
  }

   openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(StkDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  fetchStocksData() {
    this.dataService.getSavedStocks().subscribe(stock=> {
    console.log('stock = ', stock);
      stock[0].forEach((element: any) => {
        // interval(1000).subscribe(x => {
        console.log('element.token = ', element.token);
        this.dataService.getHistoricalStockDetails(element.exch_seg, element.token,
          this.selectedInterval, 
          this.formatDate(this.selectedFromDate), 
          this.formatDate(this.selectedToDate))
          .then((response) => {
        let tempResult = response.data.data;
        let previousClosedValue = 0;
        tempResult.forEach((el: any) => {
          el[el.length] = el[4] - previousClosedValue;
          el[el.length] =
            ((el[4] - previousClosedValue) / previousClosedValue) * 100;
          previousClosedValue = el[4];
        });
        this.exportToCSV(element.token, tempResult);
      })
      .catch(function (error) {
        console.log(error);
      });
    // });
      });
    });
  
  }

  exportToCSV(selectedStokToken: string, result: any) {
    let items = [...result];
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
    result.forEach((element: any) => {
      if (element.token == selectedStokToken) {
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

  formatDate(date: Date) {
    console.log(' date: ', date);
    let tempDate = new Date(date);
    let datePart = [tempDate.getFullYear(), tempDate.getMonth() + 1, tempDate.getDate()]
      .map((n, i) => n.toString().padStart(i === 0 ? 4 : 2, '0'))
      .join('-');
    let timePart = [
      tempDate.getHours(),
      tempDate.getMinutes(),
      // date.getSeconds()
    ]
      .map((n, i) => n.toString().padStart(2, '0'))
      .join(':');
    return datePart + ' ' + timePart;
  }

}
