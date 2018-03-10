export class Dime {
  name: string;
  value: number;
}
export class DimeTableChart {
  
}
export class DimeLineChart {
  name: string;
  value: number;
  rebalance: number;
}
export class Currency {
  id : number;
  name: string;
  symbol: string;
  coinName: string;
  fullName: string;
}
export class DimeTableListChart {
  rank: number;
  percent_of_dime: number;
  rebalance_price: number;
  end_price: number;
  currency: Currency;
}
