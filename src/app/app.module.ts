import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { GetTokenComponent } from './get-token/get-token.component';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { FormComponent } from './form/form.component';
import { ProfileComponent } from './profile/profile.component';
import { StockComponent } from './stock/stock.component';
import { MaterialModule } from './material.module';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { NotificationComponent } from './notification/notification.component';
import { UserComponent } from './user/user.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SidebarNoticeComponent } from './sidebar-notice/sidebar-notice.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { TopmenuPanelComponent } from './topmenu-panel/topmenu-panel.component';
import { HistoricalDataComponent } from './historical-data/historical-data.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CategoryComponent } from './category/category.component';
import { BaseChartDirective,provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartsComponent } from './charts/charts.component';
import { FilesComponent } from './files/files.component';
@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        GetTokenComponent,
        FormComponent,
        LayoutComponent,
        HeaderComponent,
        NotificationComponent,
        UserComponent,
        SidebarComponent,
        SidemenuComponent,
        SidebarNoticeComponent,
        TopmenuComponent,
        TopmenuPanelComponent,
        UserPanelComponent,
        UserComponent,
        ProfileComponent,
        StockComponent,
        HistoricalDataComponent,
        CategoryComponent,
        ChartsComponent,
        FilesComponent
    ],
    bootstrap: [AppComponent], 
    imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ScrollingModule,
        BaseChartDirective
        
      ],providers: [
        {
            provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true
        },
        provideCharts(withDefaultRegisterables()),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
