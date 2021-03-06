import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { Observable } from 'rxjs';

import { RouterEffects } from './router.effects';


describe('RouterEffects', () => {
  let actions$: Observable<any>;
  let effects: RouterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        RouterEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(RouterEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
