import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyRadioModule as MatRadioModule} from '@angular/material/legacy-radio';
import { GetTokenComponent } from './get-token/get-token.component';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { FormComponent } from './form/form.component';
import { ProfileComponent } from './profile/profile.component';
import { StockComponent } from './stock/stock.component';

@NgModule({ declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        GetTokenComponent,
        FormComponent,
        ProfileComponent,
        StockComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatRadioModule,
        MatButtonModule], providers: [
        {
            provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
