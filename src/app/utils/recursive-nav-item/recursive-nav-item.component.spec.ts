import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursiveNavItemComponent } from './recursive-nav-item.component';

describe('RecursiveNavItemComponent', () => {
  let component: RecursiveNavItemComponent;
  let fixture: ComponentFixture<RecursiveNavItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursiveNavItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursiveNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
