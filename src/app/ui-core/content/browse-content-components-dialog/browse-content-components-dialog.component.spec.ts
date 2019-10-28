import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseContentComponentsDialogComponent } from './browse-content-components-dialog.component';

describe('BrowseWidgetsDialogComponent', () => {
  let component: BrowseContentComponentsDialogComponent;
  let fixture: ComponentFixture<BrowseContentComponentsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseContentComponentsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseContentComponentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
