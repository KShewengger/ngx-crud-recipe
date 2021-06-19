import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { createEffect, Actions, ofType } from '@ngrx/effects';

import { RecipeService } from '@recipes/shared';
import * as fromActions from '@recipes/shared/store/actions';

import { go } from '@core/store';


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

  deleteRecipe$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.DELETE_RECIPE),
      map((action: fromActions.DeleteRecipe) => action.payload),
      switchMap(recipe => this.recipeService
        .deleteRecipe(recipe.uuid)
        .pipe(
          map(() => new fromActions.DeleteRecipeSuccess(recipe)),
          catchError(error => of(new fromActions.DeleteRecipeFail(error)))
        )
      )
    ));

  handleRecipeSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.DELETE_RECIPE_SUCCESS),
      map(() => go({ path: ['/'] }))
    ));

}



