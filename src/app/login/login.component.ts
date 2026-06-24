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
    this.dataService.userLogin(this.loginForm.value.totp).then((response: any) => {
      console.log('Login successful:', response.data);
      console.log('response.data.data.jwtToken:', response.data.data.jwtToken);
      this.dataService.JwtToken = response.data.data.jwtToken;
      this.dataService.RefreshToken = response.data.data.refreshToken;
      this.dataService.FeedToken = response.data.data.feedToken;
            localStorage.setItem('jwtToken', response.data.data.jwtToken);
            localStorage.setItem('refreshToken', response.data.data.refreshToken);
            localStorage.setItem('feedToken', response.data.data.feedToken);
            this.getToken();
          })
          .catch((error: any) => {
            console.log(error);
            alert("Login Failed: Invalid Totp ");
            // this.dialog.open(DialogOverviewExampleDialog,{
            //   data: {message: "Login Failed: Invalid Totp "},
            // });
          });
  }

  getToken() {
    this.dataService.getToken().then((response: any) => {
      localStorage.setItem('jwtToken', response.data.data.jwtToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      localStorage.setItem('feedToken', response.data.data.feedToken);
      
      alert("Login Sucessfully and Token generated ");
      alert(response.data.data.jwtToken);
      this.showToken = true;
      // this.dialog.open(DialogOverviewExampleDialog,{
      //   data: {message: "Login Sucessfully and Token generated"},
      // });
    })
    .catch((error: any) => {
      console.log(error);
      // this.dialog.open(DialogOverviewExampleDialog,{
      //   data: {message: "Failed Token generated"},
      // });
      alert("Failed Token generated ");

    });
  }

}
