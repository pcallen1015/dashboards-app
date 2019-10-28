import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationSlideComponent } from './presentation-slide.component';

describe('PresentationSlideComponent', () => {
  let component: PresentationSlideComponent;
  let fixture: ComponentFixture<PresentationSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
