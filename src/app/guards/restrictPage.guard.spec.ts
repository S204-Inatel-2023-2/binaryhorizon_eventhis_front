import { TestBed } from '@angular/core/testing';

import { RestrictPageGuard } from './restrictPage.guard';

describe('RestrictPageGuard', () => {
  let guard: RestrictPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RestrictPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
