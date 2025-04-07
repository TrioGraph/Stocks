import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { GetTokenComponent } from './get-token/get-token.component';
import { FormComponent } from './form/form.component';
import { ProfileComponent } from './profile/profile.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  {path:'login', component:LoginComponent, pathMatch:'full'},
  {path:'dashboard', component:DashboardComponent, pathMatch:'full'},
  {path:'getToken', component:GetTokenComponent, pathMatch:'full'},
  {path:'profile', component:ProfileComponent, pathMatch:'full'},
  {path:'stock', component:StockComponent, pathMatch:'full'},
  {path:'', redirectTo:'\login', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
