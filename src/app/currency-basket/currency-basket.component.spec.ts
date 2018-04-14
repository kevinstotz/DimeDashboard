import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyBasketComponent } from './currency-basket.component';

describe('CurrencyBasketComponent', () => {
  let component: CurrencyBasketComponent;
  let fixture: ComponentFixture<CurrencyBasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyBasketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
