import { TestBed } from '@angular/core/testing';

import { AuthPageGuard } from './authPage';

describe('AuthPageGuard', () => {
  let guard: AuthPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
