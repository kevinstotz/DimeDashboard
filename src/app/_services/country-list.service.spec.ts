import { TestBed, inject } from '@angular/core/testing';

import { CountryListService } from './country-list.service';

describe('CountryListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountryListService]
    });
  });

  it('should be created', inject([CountryListService], (service: CountryListService) => {
    expect(service).toBeTruthy();
  }));
});
