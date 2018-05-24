import { TestBed, inject } from '@angular/core/testing';

import { SelectedUserService } from './selected-user.service';

describe('SelectedUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedUserService]
    });
  });

  it('should be created', inject([SelectedUserService], (service: SelectedUserService) => {
    expect(service).toBeTruthy();
  }));
});
