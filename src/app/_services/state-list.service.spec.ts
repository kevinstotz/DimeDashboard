import { TestBed, inject } from '@angular/core/testing';

import { StateListService } from './state-list.service';

describe('StateListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateListService]
    });
  });

  it('should be created', inject([StateListService], (service: StateListService) => {
    expect(service).toBeTruthy();
  }));
});
