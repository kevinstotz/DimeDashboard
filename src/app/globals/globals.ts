let DOMAIN = '.yogishouse.com';
let DASHBOARD_HOSTNAME = 'dashboard-dime';
let WEBSITE_HOSTNAME = 'www-dime';
let API_HOSTNAME = 'api-dime';

let COOKIE_EXPIRATION = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
let SECURE = 'https://';
let UNSECURE = 'http://';
let PROTOCOL = UNSECURE;

let API_PATH = '/api';
let API_PORT = 443;
let API_URL = PROTOCOL + API_HOSTNAME + DOMAIN;
let DASHBOARD_PORT = 443;
let DASHBOARD_URL = PROTOCOL + DASHBOARD_HOSTNAME + DOMAIN;
let WEBSITE_PORT = 443;
let WEBSITE_URL = PROTOCOL + WEBSITE_HOSTNAME + DOMAIN;

export const GlobalVariable = Object.freeze({
    "API_PORT": API_PORT,
    "API_PATH": API_PATH,
    "API_URL": API_URL +             ':' + API_PORT + API_PATH,
    "NEWSLETTER_URL": API_URL +      ':' + API_PORT + API_PATH + '/newsletter',
    "LOGIN_URL": API_URL +           ':' + API_PORT + API_PATH + '/o/token?redirect_uri=' + DASHBOARD_URL,
    "REGISTER_URL": API_URL +        ':' + API_PORT + API_PATH + '/register/',
    "REGISTER_VERIFY_URL": API_URL + ':' + API_PORT + API_PATH + '/register/verify/',
    "DASHBOARD_URL": DASHBOARD_URL + ':' + DASHBOARD_PORT,
    "WEBSITE_URL": WEBSITE_URL +     ":" + WEBSITE_PORT,
    "WEBSITE_HOME": "/",
    "DOMAIN": DOMAIN,
    "COOKIE_EXPIRATION": COOKIE_EXPIRATION

 });
