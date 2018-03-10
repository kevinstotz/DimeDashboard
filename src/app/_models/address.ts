export class City {
  public id: number;
  public name: string;

  constructor(id: number,  name: string) {
    this.id = id;
    this.name = name;
  }

}

export class State {
  public id: number;
  public name: string;
  public code: string;

  constructor(id: number,  name: string, code: string) {
    this.name = name;
    this.id = id;
    this.code = code;
  }
}

export class Country {
  public id: number;
  public name: string;
  public sort_name: string;
  public phone_code: number;

  constructor(id: number,  name: string, sort_name: string, phone_code: number) {
    this.id = id;
    this.name = name;
    this.sort_name = sort_name;
    this.phone_code = phone_code;
  }

}

export class ZipCode {
  public id: number;
  public zipcode: string;

  constructor(id: number,  zipcode: string) {
    this.id = id;
    this.zipcode = zipcode;
  }
}

export class Address {
  address1: string;
  address2: string;
  address3: string;
  unit: string;
  city: City;
  country: Country;
  address: Address[];
  state: State;
  zipcode: ZipCode;
}
