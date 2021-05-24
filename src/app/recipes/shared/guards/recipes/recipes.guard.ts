import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import { getRecipesLoaded, LoadRecipes, ProductsState } from '@recipes/shared';


@Injectable()
export class RecipesGuard implements CanActivate {

  constructor(private store: Store<ProductsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }

  checkStore(): Observable<boolean> {
    return this.store
      .select(getRecipesLoaded)
      .pipe(
        tap(loaded => !loaded ? this.store.dispatch(new LoadRecipes()) : null),
        filter(loaded => loaded),
        take(1)
      );
  }

}
