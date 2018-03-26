export class BraintreePaypalResponseDetails {
  countryCode: string;
  email: string;
  firstName: string;
  lastName: string;
  payerId: string;
  shippingAddress: string;
}
export class BraintreeNonce {
  nonce: string;
}
export class BraintreeClientToken {
  token: string;
}
export class BraintreePaypalResponse {
  nonce: string;
  amount: number;
  type: string;
  details: BraintreePaypalResponseDetails;
}
export class BraintreeVisaMCResponseDetails {
  cardType: string;
  lastFour: string;
  lastTwo: string;
}
export class BraintreeVisaMCResponse {
  amount: number;
  description: string;
  nonce: string;
  type: string;
  details: BraintreeVisaMCResponseDetails;
}
