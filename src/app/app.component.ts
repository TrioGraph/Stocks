import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  navclose: boolean = false;
  title = 'Stocks';

  
  toggleNavBar() {
    this.navclose = !this.navclose;
  }


}
