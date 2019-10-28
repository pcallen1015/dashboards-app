import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutWorkspaceComponent } from './about-workspace.component';

describe('AboutWorkspaceComponent', () => {
  let component: AboutWorkspaceComponent;
  let fixture: ComponentFixture<AboutWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
