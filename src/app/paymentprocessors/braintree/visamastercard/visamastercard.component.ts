import { Component, Input, Output, EventEmitter, AfterViewChecked  } from '@angular/core';
import { BraintreeService, PaymentProcessorsService } from '../../../_services/index';
import { BraintreeClientToken, Status } from '../../../_models/index';
import { Environment } from '../../../environments/index';

declare var braintree: any;

@Component({
  selector: 'app-visamastercard',
  templateUrl: './visamastercard.component.html',
  styleUrls: ['./visamastercard.component.scss']
})

export class VisamastercardComponent implements AfterViewChecked  {

    @Output() paymentStatus: EventEmitter<any> = new EventEmitter<any>();
    @Input() buttonText = 'Buy';
    private braintreeClientTokenObject: BraintreeClientToken;
    private braintreeClientToken: string;
    private braintreeClient: object;
    private braintreeHostedFieldClient: any;
    private clientTokenNotReceived = false;
    private amount: number = 10;
    private status: Status = new Status();
    private VisaMCScriptLoaded: boolean = false;
    private loading: boolean = true;
    private environment: Environment = new Environment();

    constructor(private braintreeService: BraintreeService,
                private paymentProcessorsService: PaymentProcessorsService) {
      this.amount = this.paymentProcessorsService.getAmount();
      this.status.id = 1;
      this.status.status = 'Loading';
    }

    public loadVisaMCButton(): void {
      this.braintreeService.getClientToken()
          .subscribe( (braintreeClientTokenObject: BraintreeClientToken) => {
              this.braintreeClientToken = braintreeClientTokenObject.token;
              this.clientTokenNotReceived = false;
              this.createBraintreeClient(this.braintreeClientToken);
          }, function (error) {
              this.clientTokenNotReceived = true;
              console.log(error);
              console.log('Client token not received.');
          });
    }

    public ngAfterViewChecked(): void {
      this.paymentStatus.emit(this.status);
      if (!this.VisaMCScriptLoaded) {
          this.VisaMCScriptLoaded = true;
          this.loadVisaMCScript().then( () => {
            this.loadVisaMCButton();
            this.loading = false;
            this.status.id = 0;
            this.status.status = 'Ready';
            this.paymentStatus.emit(this.status);
          }).catch( (error) => {
              console.log(error);
          });
      }
    }

    public loadVisaMCScript(): Promise<any> {
      return new Promise((resolve, reject) => {
        let scriptElement = document.createElement('script');


        scriptElement = document.createElement('script');
        scriptElement.type = "text/javascript";
        scriptElement.src = this.environment.global.BRAINTREE_CLIENT_JS;
        document.body.appendChild(scriptElement);

        scriptElement = document.createElement('script');
        scriptElement.type = "text/javascript";
        scriptElement.src = this.environment.global.BRAINTREE_HOSTED_FIELDS_JS;
        document.body.appendChild(scriptElement);

        scriptElement = document.createElement('script');
        scriptElement.type = "text/javascript";
        scriptElement.src = this.environment.global.BRAINTREE_DATA_COLLECTOR_JS;
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
          this.status.id = 1;
          this.status.status = 'Error creating client:' + clientErr;
          this.paymentStatus.emit(this.status);
          console.error(this.status.status);
          return;
        }

        let options = {
          client: clientInstance,
          styles: {
            'input': {
                'font-size': '14px'
              },
              'input.invalid': {
                'color': 'red'
              },
              'input.valid': {
                'color': 'green'
              }
          },
          fields: {
            number: {
               selector: '#card-number',
               placeholder: '4111 1111 1111 1111'
             },
             cvv: {
               selector: '#cvv',
               placeholder: '123'
             },
             expirationDate: {
               selector: '#expiration-date',
               placeholder: '10/2019'
             },
             postalCode: {
               selector: '#postal-code',
               placeholder: '90201'
             }
          }
        };

        braintree.hostedFields.create(
          options
          , (hostedFieldsErr, hostedFieldsInstance) => {
            this.braintreeHostedFieldClient = hostedFieldsInstance;

            if (hostedFieldsErr) {
              this.status.id = 1;
              this.status.status = 'Error creating hosted Fields  Checkout:' + hostedFieldsErr;
              this.paymentStatus.emit(this.status);
              console.error(this.status.status);
              return;
            }

            // submit.removeAttribute('disabled');
          });
      });
    }

   public pay(): void {
      this.status.id = 1;
      this.status.status = 'Processing';
      this.paymentStatus.emit(this.status);
      if (this.braintreeHostedFieldClient) {
        this.braintreeHostedFieldClient.tokenize( (tokenizeErr, payload) => {
           if (tokenizeErr) {
             this.status.id = 0;
             this.status.status = tokenizeErr.message;
             this.paymentStatus.emit(this.status);
              console.error(tokenizeErr);
              return;
          }
          this.braintreeService
              .createVisaMCSale(payload, this.amount)
              .subscribe( (status: any) => {
                this.status.id = 0;
                this.status.status = status;
                this.paymentStatus.emit(status);
              });
          });
        }
    }

}
