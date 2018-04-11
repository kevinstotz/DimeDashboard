export class CurrencyHistory {
  price: number;
  time: string;
}
export class Currency {
  id: number;
  name: string;
  symbol: string;
  market_cap: number;
  history: CurrencyHistory;
}
export class CurrencyResult {
  count: number;
  next: string;
  previous: string;
  results: Currency[];
}
export class LineChartItem {
  name: string;
  value: number;
}
export class LineChartResult {
  count: number;
  next: string;
  previous: string;
  results: LineChartItem[];
}
