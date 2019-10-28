import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursiveDragDropContainerComponent } from './recursive-drag-drop-container.component';

describe('RecursiveDragDropContainerComponent', () => {
  let component: RecursiveDragDropContainerComponent;
  let fixture: ComponentFixture<RecursiveDragDropContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursiveDragDropContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursiveDragDropContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
