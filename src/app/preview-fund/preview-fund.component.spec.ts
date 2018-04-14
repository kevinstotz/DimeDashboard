import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewFundComponent } from './preview-fund.component';

describe('PreviewFundComponent', () => {
  let component: PreviewFundComponent;
  let fixture: ComponentFixture<PreviewFundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewFundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
