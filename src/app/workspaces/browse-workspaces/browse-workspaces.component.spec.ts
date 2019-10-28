import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseWorkspacesComponent } from './browse-workspaces.component';

describe('BrowseWorkspacesComponent', () => {
  let component: BrowseWorkspacesComponent;
  let fixture: ComponentFixture<BrowseWorkspacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseWorkspacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseWorkspacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
