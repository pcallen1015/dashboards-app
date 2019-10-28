import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureContentContainerFormComponent } from './configure-content-container-form.component';

describe('ConfigureContentContainerFormComponent', () => {
  let component: ConfigureContentContainerFormComponent;
  let fixture: ComponentFixture<ConfigureContentContainerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureContentContainerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureContentContainerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
