import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import { Fund, FundTableListChart, RebalancePeriods, FundPreview, FundLineChart } from '../_models/index';
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

    public getPieChart(chart: number) {
        return this.http.get<Fund[]>(this.environment.api.FUND_PIE_CHART + chart + "/", this.httpOptions);
    }

    public getTableListChart(chart: number) {
        return this.http.get<FundTableListChart[]>(this.environment.api.FUND_TABLE_URL + chart + "/", this.httpOptions);
    }

    public getRebalancePeriods(fund: number) {
        return this.http.get<RebalancePeriods[]>(this.environment.api.FUND_REBALANCE_PERIODS_URL + fund + "/", this.httpOptions);
    }

    public getFundPreview(fundPreview: FundPreview[]) {
        return this.http.get<FundLineChart[]>(this.environment.api.FUND_PREVIEW_URL, this.httpOptions);
    }

}
