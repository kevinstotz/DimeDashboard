import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BraintreePaypalResponse, BraintreeClientToken, GenericResponse } from '../_models/index';
import { Environment } from '../environments/index';

@Injectable()
export class BraintreeService {
  private braintreePaypalResponse: BraintreePaypalResponse;
  private braintreeClientToken: BraintreeClientToken;
  private httpHeaderOptions: object;
  private environment: Environment;

  constructor(private http: HttpClient) {
    this.httpHeaderOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.environment = new Environment();
    this.braintreePaypalResponse = new BraintreePaypalResponse();
  }

  public getClientToken(): Observable<BraintreeClientToken> {
      return this.http.get<BraintreeClientToken>(this.environment.api.BRAINTREE_CLIENT_TOKEN_URL, this.httpHeaderOptions)
      .map( (response: BraintreeClientToken) => {
          return response;
      })
      .catch( (error) => {
          return Observable.throw(error);
      });
  }

  public createPaypalSale(braintreePaypalResponse: BraintreePaypalResponse, amount: number): Observable<any> {
    braintreePaypalResponse.amount = amount;
    return this.http.post(this.environment.api.BRAINTREE_CREATE_PAYPAL_SALE_URL, braintreePaypalResponse, this.httpHeaderOptions)
    .map( (response: GenericResponse) => {
        return response;
    });
  }

  public createVisaMCSale(braintreePaypalResponse: BraintreePaypalResponse, amount: number): Observable<any> {
    braintreePaypalResponse.amount = amount;
    return this.http.post(this.environment.api.BRAINTREE_CREATE_VISAMC_SALE_URL, braintreePaypalResponse, this.httpHeaderOptions)
    .map( (response: GenericResponse) => {
        return response;
    });
  }
}
