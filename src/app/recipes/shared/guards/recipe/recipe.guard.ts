import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { switchMap, map, tap, take, filter } from 'rxjs/operators';

import { getRecipesEntities, getRecipesLoaded, LoadRecipes, ProductsState, Recipe } from '@recipes/shared';


@Injectable({
  providedIn: 'root'
})
export class RecipeGuard implements CanActivate {

  constructor(private store: Store<ProductsState>) {}

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
      .select(getRecipesEntities)
      .pipe(
        map(entities => !!entities[id]),
        take(1)
      );
  }

  checkRecipesLoadedState(): Observable<boolean> {
    return this.store
      .select(getRecipesLoaded)
      .pipe(
        tap(loaded => !loaded ? this.store.dispatch(new LoadRecipes()) : null),
        filter(loaded => loaded),
        take(1)
      );
  }

}
