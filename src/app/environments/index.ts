// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
import { enableProdMode } from '@angular/core';
import { environment } from './environment';

export class Environment  {
    public global: any;
    public api: any;
    private PRODUCTION: boolean;
    private SECURE: string;
    private UNSECURE: string;
    private COOKIE_EXPIRATION: Date;
    private PROTOCOL: string;
    private DOMAIN: string;

    private API_HOSTNAME: string;
    private API_PATH: string;
    private API_URL: string;
    private API_PORT: number;

    private DASHBOARD_HOSTNAME: string;
    private DASHBOARD_URL: string;
    private DASHBOARD_PORT: number;

    private WEBSITE_HOSTNAME: string;
    private WEBSITE_URL: string;
    private WEBSITE_PORT: number;

    private NEWSLETTER_URL: string;
    private LOGIN_URL: string;
    private REGISTER_URL: string;
    private DASHBOARD_CHECKOUT_URL: string
    private DASHBOARD_DEPOSIT_URL: string;
    private REGISTER_VERIFY_URL: string;
    private HISTORY_CHART_URL: string;
    private USER_INFO_URL: string;
    private COUNTRY_LIST_URL: string;
    private STATE_LIST_URL: string;
    private CITY_LIST_URL: string;
    private ZIPCODE_LIST_URL: string;
    private DIME_PIE_CHART: string;
    private DIME_TABLE_LIST_CHART: string;
    private UPLOAD_FILE_URL: string;
    private DOCUMENT_TYPES_URL: string;
    private GET_DOCUMENTS_URL: string;
    private DOCUMENT_DELETE_URL: string;

    private BRAINTREE_CREATE_PAYPAL_SALE_URL: string;
    private BRAINTREE_CREATE_VISAMC_SALE_URL: string;
    private BRAINTREE_CLIENT_TOKEN_URL: string;
    private BRAINTREE_CLIENT_JS: string;
    private BRAINTREE_HOSTED_FIELDS_JS: string;
    private BRAINTREE_DATA_COLLECTOR_JS: string
    private BRAINTREE_PAYPAL_CHECKOUT_JS: string;
    private PAYPAL_CHECKOUT_JS: string;

    constructor() {
        this.SECURE = 'https://';
        this.UNSECURE = 'http://';

        if (environment.envName == 'dev') {
            this.PRODUCTION = false;
            this.DOMAIN = '.yogishouse.com';
            this.PROTOCOL = this.UNSECURE;

            this.API_HOSTNAME = 'api.dime';
            this.API_PORT = 10006;
            this.API_PATH = '/api';
            this.API_URL = this.PROTOCOL.concat(this.API_HOSTNAME, this.DOMAIN, ':', this.API_PORT.toString());

            this.DASHBOARD_HOSTNAME = 'dashboard.dime';
            this.DASHBOARD_PORT = 10005;
            this.DASHBOARD_URL = this.PROTOCOL.concat(this.DASHBOARD_HOSTNAME, this.DOMAIN, ':', this.DASHBOARD_PORT.toString());

            this.WEBSITE_HOSTNAME = 'www.dime';
            this.WEBSITE_PORT = 10004;
            this.WEBSITE_URL = this.PROTOCOL.concat(this.WEBSITE_HOSTNAME, this.DOMAIN, ':', this.WEBSITE_PORT.toString());

            this.COOKIE_EXPIRATION = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        }
        if (environment.envName == 'prod') {
          //enableProdMode();
          this.PRODUCTION = true;
          this.PROTOCOL = this.SECURE;
          this.DOMAIN = '.yogishouse.com';

          this.API_PORT = 443;
          this.API_HOSTNAME = 'api-dime';
          this.API_PATH = '/api';
          this.API_URL = this.PROTOCOL.concat(this.API_HOSTNAME, this.DOMAIN, ':', this.API_PORT.toString());

          this.DASHBOARD_HOSTNAME = 'dashboard-dime';
          this.DASHBOARD_PORT = 443;
          this.DASHBOARD_URL = this.PROTOCOL.concat(this.DASHBOARD_HOSTNAME, this.DOMAIN, ':', this.DASHBOARD_PORT.toString());

          this.WEBSITE_HOSTNAME = 'www-dime';
          this.WEBSITE_PORT = 443;
          this.WEBSITE_URL = this.PROTOCOL.concat(this.WEBSITE_HOSTNAME, this.DOMAIN, ':', this.WEBSITE_PORT.toString());

          this.COOKIE_EXPIRATION = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        }
        if (environment.envName == 'qa') {}
        this.BRAINTREE_CREATE_VISAMC_SALE_URL = this.API_URL.concat(this.API_PATH + '/deposit/braintree/visamc/sale/');
        this.BRAINTREE_CREATE_PAYPAL_SALE_URL = this.API_URL.concat(this.API_PATH + '/deposit/braintree/paypal/sale/');
        this.BRAINTREE_CLIENT_TOKEN_URL = this.API_URL.concat(this.API_PATH + '/deposit/braintree/token/');

        this.BRAINTREE_CLIENT_JS = 'https://js.braintreegateway.com/web/3.31.0/js/client.min.js';
        this.BRAINTREE_PAYPAL_CHECKOUT_JS = 'https://js.braintreegateway.com/web/3.31.0/js/paypal-checkout.min.js';
        this.BRAINTREE_HOSTED_FIELDS_JS = 'https://js.braintreegateway.com/web/3.31.0/js/hosted-fields.js';
        this.BRAINTREE_DATA_COLLECTOR_JS = 'https://js.braintreegateway.com/web/3.31.0/js/data-collector.js';
        this.PAYPAL_CHECKOUT_JS = 'https://www.paypalobjects.com/api/checkout.js';
        this.HISTORY_CHART_URL = this.API_URL.concat(this.API_PATH + '/account/history/');
        this.DOCUMENT_TYPES_URL = this.API_URL.concat(this.API_PATH + '/account/documenttypes/');
        this.DOCUMENT_DELETE_URL = this.API_URL.concat(this.API_PATH + '/account/document/');
        this.GET_DOCUMENTS_URL = this.API_URL.concat(this.API_PATH + '/account/documents/');
        this.UPLOAD_FILE_URL = this.API_URL.concat(this.API_PATH + '/account/documentupload/');
        this.DIME_TABLE_LIST_CHART = this.API_URL.concat(this.API_PATH + '/fund/ud10/tablelistchart/');
        this.DIME_PIE_CHART = this.API_URL.concat(this.API_PATH + '/fund/ud10/piechart/');
        this.NEWSLETTER_URL = this.API_URL.concat(this.API_PATH + '/newsletter');
        this.LOGIN_URL = this.API_URL.concat(this.API_PATH, '/o/token/');
        this.DASHBOARD_DEPOSIT_URL = '/deposit';
        this.DASHBOARD_CHECKOUT_URL = '/checkout';
        this.REGISTER_URL = this.API_URL.concat( this.API_PATH, '/register/');
        this.REGISTER_VERIFY_URL = this.API_URL.concat(this.API_PATH, '/register/verify/');
        this.USER_INFO_URL = this.API_URL.concat(this.API_PATH, '/account/');
        this.COUNTRY_LIST_URL = this.API_URL.concat(this.API_PATH, '/country/');
        this.STATE_LIST_URL = this.API_URL.concat(this.API_PATH, '/state/');
        this.CITY_LIST_URL = this.API_URL.concat(this.API_PATH, '/city/');
        this.ZIPCODE_LIST_URL = this.API_URL.concat(this.API_PATH, '/zipcode/');

        this.global = {
            PRODUCTION:         this.PRODUCTION,
            COOKIE_EXPIRATION:  this.COOKIE_EXPIRATION,
            DOMAIN:             this.DOMAIN,

            DASHBOARD_PORT:     this.DASHBOARD_PORT,
            DASHBOARD_URL:      this.DASHBOARD_URL,
            DASHBOARD_HOSTNAME: this.DASHBOARD_HOSTNAME,
            DASHBOARD_DEPOSIT_URL: this.DASHBOARD_DEPOSIT_URL,
            DASHBOARD_CHECKOUT_URL: this.DASHBOARD_CHECKOUT_URL,
            WEBSITE_PORT:       this.WEBSITE_PORT,
            WEBSITE_URL:        this.WEBSITE_URL,
            WEBSITE_HOSTNAME:   this.WEBSITE_HOSTNAME,
            WEBSITE_HOME:       "/",
            BRAINTREE_CLIENT_JS:  this.BRAINTREE_CLIENT_JS,
            BRAINTREE_PAYPAL_CHECKOUT_JS: this.BRAINTREE_PAYPAL_CHECKOUT_JS,
            PAYPAL_CHECKOUT_JS:   this.PAYPAL_CHECKOUT_JS,
            BRAINTREE_DATA_COLLECTOR_JS: this.BRAINTREE_DATA_COLLECTOR_JS,
            BRAINTREE_HOSTED_FIELDS_JS:   this.BRAINTREE_HOSTED_FIELDS_JS
        }

        this.api = {

            API_PORT:             this.API_PORT,
            API_URL:              this.API_URL,
            API_HOSTNAME:         this.API_HOSTNAME,
            API_PATH:             this.API_PATH,

            DIME_PIE_CHART:       this.DIME_PIE_CHART,
            DIME_TABLE_LIST_CHART:this.DIME_TABLE_LIST_CHART,
            NEWSLETTER_URL:       this.NEWSLETTER_URL,
            LOGIN_URL:            this.LOGIN_URL,
            REGISTER_URL:         this.REGISTER_URL,
            REGISTER_VERIFY_URL:  this.REGISTER_VERIFY_URL,
            USER_INFO_URL:        this.USER_INFO_URL,
            COUNTRY_LIST_URL:     this.COUNTRY_LIST_URL,
            STATE_LIST_URL:       this.STATE_LIST_URL,
            CITY_LIST_URL:        this.CITY_LIST_URL,
            ZIPCODE_LIST_URL:     this.ZIPCODE_LIST_URL,
            UPLOAD_FILE_URL:      this.UPLOAD_FILE_URL,
            DOCUMENT_TYPES_URL:   this.DOCUMENT_TYPES_URL,
            GET_DOCUMENTS_URL:    this.GET_DOCUMENTS_URL,
            DOCUMENT_DELETE_URL:  this.DOCUMENT_DELETE_URL,
            HISTORY_CHART_URL:    this.HISTORY_CHART_URL,
            BRAINTREE_CLIENT_TOKEN_URL: this.BRAINTREE_CLIENT_TOKEN_URL,
            BRAINTREE_CREATE_VISAMC_SALE_URL: this.BRAINTREE_CREATE_VISAMC_SALE_URL,
            BRAINTREE_CREATE_PAYPAL_SALE_URL: this.BRAINTREE_CREATE_PAYPAL_SALE_URL
        }
    }
}
