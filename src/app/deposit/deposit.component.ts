import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckbox } from '@angular/material/checkbox';
import { PaymentProcessorsService } from '../_services/index';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Environment } from '../environments/index';


@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit, OnDestroy {
  private environment : Environment = new Environment()
  private autoTicks = true;
  private disabled = false;
  private invert = false;
  private max = 1000;
  private min = 10;
  private displayValue = 10;
  private showTicks = true;
  private step = 10;
  private thumbLabel = true;
  private value = 200;
  private vertical = false;
  private horzontal = true;
  private _tickInterval = 10;
  private amount: number;
  private investingRiskForm: FormGroup;

  constructor(private paymentProcessorsService: PaymentProcessorsService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.amount = this.value;
  }


  ngOnInit(): void {
    this.investingRiskForm = this.formBuilder.group({
        investCheckbox : [false, Validators.required],
        risksCheckbox : [false, Validators.required],
        noGuaranteesCheckbox : [false, Validators.required]
      });
  }

  submitInvestingRiskForm(investingRiskForm){
    if (!investingRiskForm.controls.investCheckbox.value) { return false;}
    if (!investingRiskForm.controls.risksCheckbox.value) { return false;}
    if (!investingRiskForm.controls.noGuaranteesCheckbox.value) { return false;}
    this.router.navigate([this.environment.global.DASHBOARD_CHECKOUT_URL])
  }
  ngOnDestroy(): void {
    this.paymentProcessorsService.setAmount(this.amount);
  }

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }

  set tickInterval(v) {
    this._tickInterval = Number(v);
  }

  private pitch(event: any) {
    this.amount =  event.value;
  }

}
