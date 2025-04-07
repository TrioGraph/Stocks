import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
    selector: 'app-get-token',
    templateUrl: './get-token.component.html',
    styleUrls: ['./get-token.component.scss'],
    standalone: false
})
export class GetTokenComponent implements OnInit {
  getTokenForm!: FormGroup

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getTokenForm = new FormGroup({
      refreshToken: new FormControl(''),
      });
      console.log('refreshToken:: ', localStorage.getItem('refreshToken'));
      this.getTokenForm.controls['refreshToken'].setValue(localStorage.getItem('refreshToken'));
  }

  onSubmit() {
    console.warn(this.getTokenForm.value);
    this.dataService.getToken();
  }

}
