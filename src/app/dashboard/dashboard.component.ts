import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: false
})
export class DashboardComponent implements OnInit {
  navclose: boolean = false;
  constructor() { }

  ngOnInit(): void {
    
  }

  toggleNavBar() {
    this.navclose = !this.navclose;
  }


  
}
