import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureContentContainerOptionFormComponent } from './configure-content-container-option-form.component';

describe('ConfigureContentContainerOptionFormComponent', () => {
  let component: ConfigureContentContainerOptionFormComponent;
  let fixture: ComponentFixture<ConfigureContentContainerOptionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureContentContainerOptionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureContentContainerOptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
