import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { PaymentProcessorsService } from '../../_services/index';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Environment } from '../../environments/index';
import { isNumeric } from 'rxjs/util/isNumeric';
import { Status } from '../../_models/index';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewChecked {
  private amount: number = 0;
  private step: number = -1;
  private paypalPaymentMessage: Status;
  private visaMCPaymentMessage: Status = new Status();
  private environment : Environment = new Environment();

  constructor(private paymentProcessorsService: PaymentProcessorsService,
              private router: Router) {
    this.amount = this.paymentProcessorsService.getAmount();
    if (isNumeric(this.amount) && this.amount >= 10) {
      return;
    }

    this.router.navigate([this.environment.global.DASHBOARD_DEPOSIT_URL])
  }

  public ngOnInit() {
    this.paypalPaymentMessage = new Status();
  }
  public ngAfterViewChecked(): void {

  }
  private paypalPaymentStatus(response): void {
    this.paypalPaymentMessage = response;
  }

  private visaMCPaymentStatus(response): void {
    this.visaMCPaymentMessage = response;
  }

  private setStep(index: number) {
    this.step = index;
  }

}
