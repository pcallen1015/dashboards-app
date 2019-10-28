import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureContentContainerDialogComponent } from './configure-content-container-dialog.component';

describe('ConfigureContentContainerDialogComponent', () => {
  let component: ConfigureContentContainerDialogComponent;
  let fixture: ComponentFixture<ConfigureContentContainerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureContentContainerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureContentContainerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
