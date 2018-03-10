import { Injectable } from '@angular/core';
import { Environment } from '../environments/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GenericResponse, City } from '../_models/index';


@Injectable()
export class CityListService {
  private environment: Environment;
  private httpOptions: object;

  constructor(private http: HttpClient) {
      this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      this.environment = new Environment();
   }
   getByState(stateId) {
      return this.http.get<City[]>(this.environment.api.CITY_LIST_URL + stateId + '/', this.httpOptions);
   }
}
