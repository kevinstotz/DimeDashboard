import { Injectable } from '@angular/core';
import { Environment } from '../environments/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GenericResponse, State } from '../_models/index';

@Injectable()
export class StateListService {
  private environment: Environment;
  private httpOptions: object;


  constructor(private http: HttpClient) {
      this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      this.environment = new Environment();
   }

   getByCountry(countryId) {
       return this.http.get<State[]>(this.environment.api.STATE_LIST_URL + countryId + '/', this.httpOptions);
   }

}
