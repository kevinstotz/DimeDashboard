import { NgModule, NO_ERRORS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from  '@angular/platform-browser/animations';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageErrorsModule }  from './modules/page-errors/index';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { MatTableModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { CookieModule, CookieService } from 'ngx-cookie';

import {} from 'jasmine';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { AppComponent }  from './app.component';
import { AppRoutingModule }        from './app.routing';
import { AlertComponent } from './_directives/index';
import { LeftnavitemComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';

import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { HeaderComponent } from './header/index';
import { FooterComponent } from './footer/index';
import { DashboardComponent } from './dashboard/index';
import { AboutComponent } from './about/index';
import { LogoutComponent } from './logout/index';
import { ProfileComponent } from './profile/index';
import { LeftnavComponent } from './leftnav/index';
import { TopmaincontentComponent } from './topmaincontent/index';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        PageErrorsModule,
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatTableModule,
        MatDialogModule,
        MDBBootstrapModule.forRoot(),
        CookieModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        DashboardComponent,
        AboutComponent,
        LogoutComponent,
        ProfileComponent,
        LeftnavitemComponent,
        LeftnavComponent,
        TopmaincontentComponent
    ],
    entryComponents: [
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        // provider used to create fake backend
        fakeBackendProvider,
        CookieService
    ],
    schemas: [ NO_ERRORS_SCHEMA ],
    bootstrap: [AppComponent]
})

export class AppModule { }
