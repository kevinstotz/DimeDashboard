import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisamastercardComponent } from './visamastercard.component';

describe('VisamastercardComponent', () => {
  let component: VisamastercardComponent;
  let fixture: ComponentFixture<VisamastercardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisamastercardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisamastercardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
