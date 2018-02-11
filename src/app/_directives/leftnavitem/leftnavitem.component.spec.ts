import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftnavitemComponent } from './leftnavitem.component';

describe('LeftnavitemComponent', () => {
  let component: LeftnavitemComponent;
  let fixture: ComponentFixture<LeftnavitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftnavitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftnavitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
