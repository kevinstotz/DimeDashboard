import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import { History } from '../_models/index';
import { Environment } from '../environments/index';
import 'rxjs/add/operator/map';
import { DatePipe } from '@angular/common';

@Injectable()
export class HistoryService {
  private environment: Environment;
  private httpOptions: object;

  constructor(private http: HttpClient) {
      this.environment = new Environment();
      this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
  }

  public getHistory() {
      return this.http.get<History[]>(this.environment.api.HISTORY_CHART_URL, this.httpOptions);
  }

}
