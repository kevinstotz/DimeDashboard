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
  id: number;
  percent: number;
}

export class FundLineChart {
  rank: number;
  percent: number;
  rebalance_price: number;
  end_price: number;
  symbol: string;
  name: string;
}
