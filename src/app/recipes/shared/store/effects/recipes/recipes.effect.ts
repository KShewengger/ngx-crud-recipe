import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { createEffect, Actions, ofType } from '@ngrx/effects';

import { RecipeService } from '@recipes/shared';
import * as fromActions from '@recipes/shared/store/actions';


@Injectable()
export class RecipesEffects {

  constructor(
    private actions$: Actions,
    private recipeService: RecipeService
  ) { }

  loadPizzas$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.LOAD_RECIPES),
    switchMap(() => this.recipeService
      .getAllRecipes()
      .pipe(
        map(recipes => new fromActions.LoadRecipesSuccess(recipes)),
        catchError(error => of(new fromActions.LoadRecipesFail(error)))
      )
    )
  ));

}



