import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopmaincontentComponent } from './topmaincontent.component';

describe('TopmaincontentComponent', () => {
  let component: TopmaincontentComponent;
  let fixture: ComponentFixture<TopmaincontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopmaincontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopmaincontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
