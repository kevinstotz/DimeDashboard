import { Injectable } from '@angular/core';
import { Environment } from '../environments/index';
import { GenericResponse} from '../_models/index';
import { AuthenticationService } from '../_services/authentication.service';


@Injectable()
export class PaymentProcessorsService {
  private environment: Environment;
  private amount: number;

  constructor(private authenticationService: AuthenticationService) {
      this.environment = new Environment();
  }

  public getAmount() {
    return this.amount;
  }

  public setAmount(amount) {
    this.amount = amount;
  }

}
