import { TestBed, inject } from '@angular/core/testing';

import { GravityApplicationsService } from './applications.service';

describe('GravityApplicationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GravityApplicationsService]
    });
  });

  it('should be created', inject([GravityApplicationsService], (service: GravityApplicationsService) => {
    expect(service).toBeTruthy();
  }));
});
