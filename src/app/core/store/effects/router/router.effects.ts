import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { tap, map } from 'rxjs/operators';

import * as fromActions from '@core/store/actions';


@Injectable()
export class RouterEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  navigate$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.GO),
    map((action: fromActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => this.router.navigate(path, { queryParams, ...extras }))
  ), { dispatch: false });

  navigateBack$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.BACK),
    tap(() => this.location.back())
  ), { dispatch: false });

  navigateForward$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.FORWARD),
    tap(() => this.location.forward())
  ), { dispatch: false });

}

