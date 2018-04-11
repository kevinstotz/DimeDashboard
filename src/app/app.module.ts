import { NgModule, NO_ERRORS_SCHEMA }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule }        from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from  '@angular/platform-browser/animations';
import { CookieModule, CookieService } from 'ngx-cookie';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule, MatDialogModule, MatOptionModule, MatMenuModule, MatSelectModule} from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule, MatSlideToggleModule, MatButtonModule, MatSliderModule, MatFormFieldModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PageErrorsModule }  from './modules/page-errors/index';
import { WebcamModule } from 'ngx-webcam';
import {} from 'jasmine';

import { AuthGuard } from './_guards/index';
import { JwtInterceptor, DivisionPipe } from './_helpers/index';
import { AlertService, AuthenticationService, UserService, FileUploadService, PaymentProcessorsService } from './_services/index';
import { DimeService, CountryListService, CityListService, StateListService, ZipcodeListService } from './_services/index';
import { BraintreeService, HistoryService, CurrencyService } from './_services/index';
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
import { DimetableComponent } from './dimetable/index';
import { CheckoutComponent } from './paymentprocessors/index';
import { PaypalComponent, VisamastercardComponent } from './paymentprocessors/braintree/index';
import { CurrencyComponent } from './currency/index';
import { SearchComponent } from './search/index';
import { LineChartComponent } from './linechart/index';
import { CurrencyBasketComponent } from './currency-basket/index';


@NgModule({
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        CookieModule.forRoot(),
        CommonModule,
        FormsModule,
        HttpClientModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFileUploadModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatOptionModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatSnackBarModule,
        MatTabsModule,
        MatTableModule,
        MatTooltipModule,
        MDBBootstrapModule.forRoot(),
        PageErrorsModule,
        ReactiveFormsModule,
        WebcamModule
    ],
    exports: [
        CommonModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        HttpClientModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatOptionModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatSliderModule
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
        DimetableComponent,
        CheckoutComponent,
        PaypalComponent,
        VisamastercardComponent,
        CurrencyComponent,
        SearchComponent,
        LineChartComponent,
        CurrencyBasketComponent
    ],
    entryComponents: [
      CurrencyBasketComponent
    ],
    providers: [
        AlertService,
        AuthenticationService,
        AuthGuard,
        BraintreeService,
        CityListService,
        CookieService,
        CountryListService,
        CurrencyService,
        DimeService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        FileUploadService,
        HistoryService,
        PaymentProcessorsService,
        StateListService,
        UserService,
        ZipcodeListService
    ],
    schemas: [ NO_ERRORS_SCHEMA ],
    bootstrap: [AppComponent]
})

export class AppModule { }
