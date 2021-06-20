import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import { selectRecipesLoaded, loadRecipes, RecipeState } from '@recipes/shared';


@Injectable({
  providedIn: 'root'
})
export class RecipesGuard implements CanActivate {

  constructor(private store: Store<RecipeState>) {}

  canActivate(): Observable<boolean> {
    return this.checkRecipesLoadedState()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }

  checkRecipesLoadedState(): Observable<boolean> {
    return this.store
      .pipe(
        select(selectRecipesLoaded),
        tap(loaded => !loaded ? this.store.dispatch(loadRecipes()) : null),
        filter(loaded => loaded),
        take(1)
      );
  }

}
