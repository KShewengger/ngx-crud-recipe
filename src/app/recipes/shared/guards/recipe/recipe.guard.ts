import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { switchMap, map, tap, take, filter } from 'rxjs/operators';

import {
  selectRecipesLoaded,
  loadRecipes,
  selectAllRecipesIds,
  RecipeState
} from '@recipes/shared';


@Injectable({
  providedIn: 'root'
})
export class RecipeGuard implements CanActivate {

  constructor(private store: Store<RecipeState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkRecipesLoadedState()
      .pipe(
        switchMap(() => {
          const id = route.params.id;
          return this.checkRecipe(id);
        })
      );
  }

  checkRecipe(id: string): Observable<boolean> {
    return this.store
      .pipe(
        select(selectAllRecipesIds),
        map(ids => (ids as string[]).includes(id)),
        take(1)
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
