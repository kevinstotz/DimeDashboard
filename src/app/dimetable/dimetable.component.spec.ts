import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimetableComponent } from './dimetable.component';

describe('DimetableComponent', () => {
  let component: DimetableComponent;
  let fixture: ComponentFixture<DimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
