import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentHostComponent } from './content-host.component';

describe('ContentHostComponent', () => {
  let component: ContentHostComponent;
  let fixture: ComponentFixture<ContentHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
