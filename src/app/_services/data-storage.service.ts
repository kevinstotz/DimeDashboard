import { Injectable } from '@angular/core';
import { CookieService, CookieOptions } from 'ngx-cookie';
import { Environment } from '../environments/index';


@Injectable()
export class DataStorageService {
  private cookieOptions: CookieOptions;
  private environment: Environment;

  constructor(private cookieService: CookieService) {
    this.environment = new Environment();
    this.cookieOptions = { domain: this.environment.global.DOMAIN };
  }

  public setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    sessionStorage.setItem(key, JSON.stringify(value));
    this.cookieService.put(key, JSON.stringify(value), this.cookieOptions);
  }

  public removeItem(key) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
    this.cookieService.remove(key, this.cookieOptions);
  }

  public getItem(key) {
      return this.cookieService.get(key);
  }

}
