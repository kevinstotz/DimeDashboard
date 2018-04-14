export class Fund {
  name: string;
  value: number;
}

export class FundTableListChart {
  rank: number;
  percent: number;
  rebalance_price: number;
  end_price: number;
  symbol: string;
  name: string;
}

export class RebalancePeriods {
  id: number;
  period: string;
}

export class FundPreview {
  currencyId: number;
  percent: number;
}

export class FundLineChart {
  name: number;
  value: number;
}
