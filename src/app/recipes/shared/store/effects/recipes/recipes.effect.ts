import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { createEffect, Actions, ofType } from '@ngrx/effects';

import { Recipe, RecipeService } from '@recipes/shared';
import * as RecipeActions from '@recipes/shared/store/actions';

import { go } from '@core/store';


@Injectable()
export class RecipesEffects {

  constructor(
    private actions$: Actions,
    private recipeService: RecipeService
  ) { }

  loadPizzas$ = createEffect(() => this.actions$.pipe(
    ofType(RecipeActions.loadRecipes),
    switchMap(() => this.recipeService
      .getAllRecipes()
      .pipe(
        map(recipes => RecipeActions.loadRecipesSuccess({ recipes })),
        catchError(error => of(RecipeActions.loadRecipesFail({ error })))
      )
    )
  ));

  deleteRecipe$ = createEffect(() => this.actions$
    .pipe(
      ofType(RecipeActions.deleteRecipe),
      map(payload => payload.recipe),
      switchMap(recipe => this.recipeService
        .deleteRecipe(recipe.id)
        .pipe(
          map(() => RecipeActions.deleteRecipeSuccess({ recipe })),
          catchError(error => of(RecipeActions.deleteRecipeFail({ error })))
        )
      )
    ));

  handleRecipeSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(RecipeActions.deleteRecipeSuccess),
      map(() => go({ path: ['/'] }))
    ));

}



