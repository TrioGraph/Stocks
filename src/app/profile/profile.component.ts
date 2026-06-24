import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: false
})
export class ProfileComponent implements OnInit {
  result: any;
  constructor(private dataService: DataService, private router:Router) { }

  ngOnInit(): void {

    // this.dataService.getProfile().subscribe((data: any) => {
    //   console.log(data);
    // });

    this.dataService.getProfile().then((response) =>{
      this.result = response;
      console.log('response :', response);
    // this.router.navigateByUrl("dashboard")
    })
    .catch((error: any) => {
    // this.router.navigateByUrl("login")
    });
  }

  onSubmit() {
    // this.dataService.getProfile().then((response) =>{
    //   this.result = response;
    //   console.log('response :', response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }

}
