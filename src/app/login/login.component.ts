import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../DialogOverviewExampleDialog';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  dialog = inject(MatDialog);
  showToken:boolean = false;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
    totp: new FormControl(''),
    });
  }

  onSubmit() {
    console.warn(this.loginForm.value);
    this.dataService.userLogin(this.loginForm.value.totp).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        this.dataService.JwtToken = response.data?.jwtToken ?? '';
        this.dataService.RefreshToken = response.data?.refreshToken ?? '';
        this.dataService.FeedToken = response.data?.feedToken ?? '';
        localStorage.setItem('jwtToken', this.dataService.JwtToken);
        localStorage.setItem('refreshToken', this.dataService.RefreshToken);
        localStorage.setItem('feedToken', this.dataService.FeedToken);
        this.getToken();
      },
      (error: any) => {
        console.log(error);
        alert('Login Failed: Invalid Totp ');
      }
    );
  }

  getToken() {
    this.dataService.getToken().subscribe(
      (response: any) => {
        this.dataService.JwtToken = response.data?.jwtToken ?? '';
        this.dataService.RefreshToken = response.data?.refreshToken ?? '';
        this.dataService.FeedToken = response.data?.feedToken ?? '';
        alert('Login Sucessfully and Token generated ');
        alert(this.dataService.JwtToken);
        this.showToken = true;
      },
      (error: any) => {
        console.log(error);
        alert('Failed Token generated ');
      }
    );
  }

}
