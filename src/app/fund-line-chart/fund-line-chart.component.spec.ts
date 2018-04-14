import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundLineChartComponent } from './fund-line-chart.component';

describe('FundLineChartComponent', () => {
  let component: FundLineChartComponent;
  let fixture: ComponentFixture<FundLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
