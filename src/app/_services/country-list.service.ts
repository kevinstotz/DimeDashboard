import { Injectable } from '@angular/core';
import { Environment } from '../environments/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GenericResponse, Country } from '../_models/index';


@Injectable()
export class CountryListService {
  private environment: Environment;
  private httpOptions: object;


  constructor(private http: HttpClient) {
      this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      this.environment = new Environment();
   }

   getAll() {
       return this.http.get<Country[]>(this.environment.api.COUNTRY_LIST_URL, this.httpOptions);
   }

}
