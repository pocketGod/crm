import { TestBed } from '@angular/core/testing';

import { PreventDoubleSignInGuard } from './prevent-double-sign-in.guard';

describe('PreventDoubleSignInGuard', () => {
  let guard: PreventDoubleSignInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventDoubleSignInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
