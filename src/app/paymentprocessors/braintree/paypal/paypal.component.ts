import { Component, Input, Output, EventEmitter, AfterViewChecked, OnInit } from '@angular/core';
import { BraintreeService, PaymentProcessorsService } from '../../../_services/index';
import { BraintreeClientToken, Status } from '../../../_models/index';
import { Environment } from '../../../environments/index';

declare var braintree: any;
declare var paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})

export class PaypalComponent implements AfterViewChecked, OnInit  {

    @Output() paymentStatus: EventEmitter<any> = new EventEmitter<any>();
    @Input() buttonText = 'Buy';
    private status: Status = new Status();
    private braintreeClientTokenObject: BraintreeClientToken;
    private braintreeClientToken: string;
    private braintreeClient: object;
    private amount: number = 10;
    public paypalScriptLoaded: boolean = false;
    private environment: Environment = new Environment();

    constructor(private braintreeService: BraintreeService,
                private paymentProcessorsService: PaymentProcessorsService) {
        this.amount = this.paymentProcessorsService.getAmount();
        this.status.id = 1;
        this.status.status = 'Loading';

    }

    public loadPaypalButton(): void {
      this.braintreeService.getClientToken()
          .subscribe( (braintreeClientTokenObject: BraintreeClientToken) => {
              this.braintreeClientToken = braintreeClientTokenObject.token;
              this.createBraintreeClient(this.braintreeClientToken);
          }, function (error) {
              this.status.id = 1;
              this.status.status = 'Client token not received:' +  error;
              this.paymentStatus.emit(this.status);
              console.log('Client token not received.' + error);
          });
    }

    public ngOnInit(): void {
      this.paymentStatus.emit(this.status);
    }

    public ngAfterViewChecked(): void {

      if (!this.paypalScriptLoaded) {
          this.paypalScriptLoaded = true;
          this.loadPaypalScript().then( () => {
            this.loadPaypalButton();
          }).catch( (error) => {
            this.status.id = 1;
            this.status.status = 'Failed Loading Paypal:' +  error;
            this.paymentStatus.emit(this.status);
            console.log(error);
          });
      }
    }

    public loadPaypalScript(): Promise<any> {
      return new Promise((resolve, reject) => {
        let scriptElement = document.createElement('script');

        scriptElement = document.createElement('script');
        scriptElement.type = "text/javascript";
        scriptElement.src = this.environment.global.PAYPAL_CHECKOUT_JS;
        document.body.appendChild(scriptElement);

        scriptElement = document.createElement('script');
        scriptElement.type = "text/javascript";
        scriptElement.src = this.environment.global.BRAINTREE_CLIENT_JS;
        document.body.appendChild(scriptElement);

        scriptElement = document.createElement('script');
        scriptElement.type = "text/javascript";
        scriptElement.src = this.environment.global.BRAINTREE_PAYPAL_CHECKOUT_JS;
        document.body.appendChild(scriptElement);

        scriptElement.onload = () => {
          resolve();
        };
      });
    }

    public createBraintreeClient(braintreeClientToken) {
      braintree.client.create({
        authorization: braintreeClientToken
      },  (clientErr, clientInstance) => {
        this.braintreeClient = clientInstance;
        // Stop if there was a problem creating the client.
        // This could happen if there is a network error or if the authorization
        // is invalid.
        if (clientErr) {
          console.error('Error creating client:' + clientErr);
          this.status.id = 1;
          this.status.status = 'Error creating client:' +  clientErr;
          this.paymentStatus.emit(this.status);
          return;
        }

        // Create a PayPal Checkout component.
        braintree.paypalCheckout.create({
          client: clientInstance
        }, (paypalCheckoutErr, paypalCheckoutInstance) => {

          // Stop if there was a problem creating PayPal Checkout.
          // This could happen if there was a network error or if it's incorrectly
          // configured.
          if (paypalCheckoutErr) {
            this.status.id = 1;
            this.status.status = 'Error creating PayPal Checkout:' + paypalCheckoutErr;
            this.paymentStatus.emit(this.status);
            console.error('Error creating PayPal Checkout:' + paypalCheckoutErr);
            return;
          }

          // Set up PayPal with the checkout.js library
          paypal.Button.render({
            env: 'sandbox', // or 'production'
            commit: true,
            payment: () => {
              this.status.id = 1;
              this.status.status = 'Processsing';
              this.paymentStatus.emit(this.status);
              let options = {
                flow: "vault",
                amount: this.amount,
                displayName: "Mutual Fund",
                enableShippingAddress: false,
                intent: "sale",
                currency: 'USD',
                locale: 'en_US'
              };
              return paypalCheckoutInstance.createPayment(options);

            },

            onAuthorize: (data, actions) => {
              return paypalCheckoutInstance.tokenizePayment(data)
                .then( (payload) => {
                  this.braintreeService.createPaypalSale(payload, this.amount)
                    .subscribe( (response: any) => {
                      if (response.status == 1) {
                        this.status.id = 0;
                        this.status.status = "Transaction Successful";
                        this.paymentStatus.emit(this.status);
                      } else {
                        this.status.id = 0;
                        this.status.status = response.message;
                        this.paymentStatus.emit(this.status);
                      }
                    });
                });
            },

            onCancel: (data) => {
              console.log('checkout.js payment cancelled', JSON.stringify(data));
              paypalCheckoutInstance.teardown( () => {
                this.status.id = 0;
                this.status.status = 'Transaction Cancelled';
                this.paymentStatus.emit(this.status);
              });
            },

            onError: (err) => {
              paypalCheckoutInstance.teardown( () => {
                this.status.id = 0;
                this.status.status = 'Transaction Failed';
                this.paymentStatus.emit(this.status);
              });
              console.error('checkout.js error', err);
            }
          }, '#paypal-button').then( () => {
            this.status.id = 0;
            this.status.status = 'Ready';
            this.paymentStatus.emit(this.status);
          });
        });
      });
    }

}
