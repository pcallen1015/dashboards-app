import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseWidgetsDialogComponent } from './browse-widgets-dialog.component';

describe('BrowseWidgetsDialogComponent', () => {
  let component: BrowseWidgetsDialogComponent;
  let fixture: ComponentFixture<BrowseWidgetsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseWidgetsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseWidgetsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
