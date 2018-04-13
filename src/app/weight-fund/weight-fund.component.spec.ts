import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightFundComponent } from './weight-fund.component';

describe('WeightFundComponent', () => {
  let component: WeightFundComponent;
  let fixture: ComponentFixture<WeightFundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightFundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
