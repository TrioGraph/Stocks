import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    // this.dataService.getProfile().subscribe((data: any) => {
    //   console.log(data);
    // });
  }

  onSubmit() {
    this.dataService.getProfile();
  }

}
