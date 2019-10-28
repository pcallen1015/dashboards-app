import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarwarsContentComponent } from './starwars-content.component';

describe('StarwarsWidgetBodyComponent', () => {
  let component: StarwarsContentComponent;
  let fixture: ComponentFixture<StarwarsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarwarsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarwarsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
