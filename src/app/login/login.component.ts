import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
    totp: new FormControl(''),
    });
  }

  onSubmit() {
    console.warn(this.loginForm.value);
    this.dataService.userLogin(this.loginForm.value.totp);
  }
}
