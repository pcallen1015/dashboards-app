import { TestBed, inject } from '@angular/core/testing';

import { WorkspacesService } from './workspaces.service';

describe('WorkspacesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkspacesService]
    });
  });

  it('should be created', inject([WorkspacesService], (service: WorkspacesService) => {
    expect(service).toBeTruthy();
  }));
});
