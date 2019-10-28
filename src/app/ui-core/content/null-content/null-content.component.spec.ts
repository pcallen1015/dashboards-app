import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NullContentComponent } from './null-content.component';

describe('NullContentComponent', () => {
  let component: NullContentComponent;
  let fixture: ComponentFixture<NullContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NullContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NullContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
