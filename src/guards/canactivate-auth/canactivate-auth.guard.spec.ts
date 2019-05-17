import { TestBed, async, inject } from '@angular/core/testing';

import { CanactivateAuthGuard } from './canactivate-auth.guard';

describe('CanactivateAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanactivateAuthGuard]
    });
  });

  it('should ...', inject([CanactivateAuthGuard], (guard: CanactivateAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
