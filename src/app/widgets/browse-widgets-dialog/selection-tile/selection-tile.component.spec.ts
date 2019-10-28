import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetSelectionTileComponent } from './widget-selection-tile.component';

describe('WidgetSelectionTileComponent', () => {
  let component: WidgetSelectionTileComponent;
  let fixture: ComponentFixture<WidgetSelectionTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetSelectionTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetSelectionTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
