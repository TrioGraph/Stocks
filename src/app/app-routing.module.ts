import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GetTokenComponent } from './get-token/get-token.component';
import { FormComponent } from './form/form.component';
import { ProfileComponent } from './profile/profile.component';
import { StockComponent } from './stock/stock.component';
import { LayoutComponent } from './layout/layout.component';
import { HistoricalDataComponent } from './historical-data/historical-data.component';
import { CategoryComponent } from './category/category.component';
import { FilesComponent } from './files/files.component';
import { OptionsTradingComponent } from './options-trading/options-trading.component';

const routes: Routes = [
  {path:'login', component:LoginComponent, pathMatch:'full'},
  {path:'getToken', component:GetTokenComponent, pathMatch:'full'},
  {path:'profile', component:ProfileComponent, pathMatch:'full'},
  {path:'stock', component:StockComponent, pathMatch:'full'},
  {path:'layout', component:LayoutComponent, pathMatch:'full'},
  {path:'historicalData', component:HistoricalDataComponent, pathMatch:'full'},
  {path:'dashboard', component:CategoryComponent, pathMatch:'full'},
  {path:'files', component:FilesComponent, pathMatch:'full'},
  {path:'options', component:OptionsTradingComponent, pathMatch:'full'},
  {path:'', redirectTo:'\profile', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
