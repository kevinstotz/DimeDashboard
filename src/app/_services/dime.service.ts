import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import { Dime, DimeTableListChart } from '../_models/index';
import { Environment } from '../environments/index';
import 'rxjs/add/operator/map';

@Injectable()
export class DimeService {
    private environment: Environment;
    private httpOptions: object;

    constructor(private http: HttpClient) {
        this.environment = new Environment();
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    }

    getPieChart(chart) {
        return this.http.get<Dime[]>(this.environment.api.DIME_PIE_CHART + chart + "/", this.httpOptions);
    }


    getTableListChart(chart) {
        return this.http.get<DimeTableListChart[]>(this.environment.api.DIME_TABLE_LIST_CHART + chart + "/", this.httpOptions);
    }

}
