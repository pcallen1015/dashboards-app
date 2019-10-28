import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDropdownMenuComponent } from './dynamic-dropdown-menu.component';

describe('DynamicDropdownMenuComponent', () => {
  let component: DynamicDropdownMenuComponent;
  let fixture: ComponentFixture<DynamicDropdownMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDropdownMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
