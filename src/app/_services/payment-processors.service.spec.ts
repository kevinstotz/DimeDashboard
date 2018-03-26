import { TestBed, inject } from '@angular/core/testing';

import { PaymentProcessorsService } from './payment-processors.service';

describe('PaymentProcessorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentProcessorsService]
    });
  });

  it('should be created', inject([PaymentProcessorsService], (service: PaymentProcessorsService) => {
    expect(service).toBeTruthy();
  }));
});
