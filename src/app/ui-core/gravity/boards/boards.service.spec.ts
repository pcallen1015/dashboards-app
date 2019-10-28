import { TestBed, inject } from '@angular/core/testing';

import { GravityBoardsService } from './boards.service';

describe('GravityBoardsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GravityBoardsService]
    });
  });

  it('should be created', inject([GravityBoardsService], (service: GravityBoardsService) => {
    expect(service).toBeTruthy();
  }));
});
