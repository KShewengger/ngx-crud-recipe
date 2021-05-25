import { TestBed } from '@angular/core/testing';

import { RecipeGuard } from './recipe.guard';

describe('RecipeGuard', () => {
  let guard: RecipeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RecipeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
