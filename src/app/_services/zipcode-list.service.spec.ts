import { TestBed, inject } from '@angular/core/testing';

import { ZipcodeListService } from './zipcode-list.service';

describe('ZipcodeListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZipcodeListService]
    });
  });

  it('should be created', inject([ZipcodeListService], (service: ZipcodeListService) => {
    expect(service).toBeTruthy();
  }));
});
