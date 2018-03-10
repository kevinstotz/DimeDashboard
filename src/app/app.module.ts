import { NgModule, NO_ERRORS_SCHEMA }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule }        from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from  '@angular/platform-browser/animations';
import { CookieModule, CookieService } from 'ngx-cookie';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatTableModule, MatSelectModule, MatOptionModule, MatDialogModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule, MatSlideToggleModule, MatButtonModule, MatFormFieldModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PageErrorsModule }  from './modules/page-errors/index';

import {} from 'jasmine';

import { AuthGuard } from './_guards/index';
import { JwtInterceptor, DivisionPipe } from './_helpers/index';
import { AlertService, AuthenticationService, UserService, FileUploadService } from './_services/index';
import { DimeService, CountryListService, CityListService, StateListService, ZipcodeListService } from './_services/index';

import { AboutComponent } from './about/index';
import { AlertComponent } from './_directives/index';
import { AppComponent }  from './app.component';
import { HistoryComponent } from './history/index';
import { FooterComponent } from './footer/index';
import { HeaderComponent } from './header/index';
import { HomeComponent } from './home/index';
import { LeftnavComponent } from './leftnav/index';
import { LeftnavitemComponent } from './_directives/index';
import { LoginComponent } from './login/index';
import { LogoutComponent } from './logout/index';
import { ProfileComponent } from './profile/index';
import { TopmaincontentComponent } from './topmaincontent/index';
import { DepositComponent } from './deposit/index';
import { DocumentsComponent } from './documents/index';
import { DimetableComponent } from './dimetable/dimetable.component';


@NgModule({
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        CookieModule.forRoot(),
        CommonModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatOptionModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatTableModule,
        MatTooltipModule,
        MDBBootstrapModule.forRoot(),
        PageErrorsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        HttpClientModule,
        MatInputModule,
        MatListModule,
        MatOptionModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatSlideToggleModule
    ],
    declarations: [
        AboutComponent,
        AlertComponent,
        AppComponent,
        FooterComponent,
        DivisionPipe,
        HeaderComponent,
        HistoryComponent,
        HomeComponent,
        LeftnavComponent,
        LeftnavitemComponent,
        LoginComponent,
        LogoutComponent,
        ProfileComponent,
        TopmaincontentComponent,
        DepositComponent,
        DocumentsComponent,
        DimetableComponent
    ],
    entryComponents: [
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        CookieService,
        CountryListService,
        DimeService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        FileUploadService,
        UserService,
        StateListService,
        ZipcodeListService,
        CityListService
    ],
    schemas: [ NO_ERRORS_SCHEMA ],
    bootstrap: [AppComponent]
})

export class AppModule { }
