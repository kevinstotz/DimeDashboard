import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundWeightChartComponent } from './fund-weight-chart.component';

describe('FundWeightChartComponent', () => {
  let component: FundWeightChartComponent;
  let fixture: ComponentFixture<FundWeightChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundWeightChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundWeightChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
