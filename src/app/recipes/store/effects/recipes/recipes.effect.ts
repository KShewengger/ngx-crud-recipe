import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { createEffect, Actions, ofType } from '@ngrx/effects';

import { RecipeService } from '@recipes/shared/services/recipe/recipe.service';
import * as RecipesActions from '@recipes/store/actions/recipes/recipes.action';


@Injectable()
export class RecipesEffects {

  constructor(
    private actions$: Actions,
    private recipeService: RecipeService
  ) { }

  loadPizzas$ = createEffect(() => this.actions$.pipe(
    ofType(RecipesActions.LOAD_RECIPES),
    tap(console.log),
    switchMap(() => this.recipeService
      .getAllRecipes()
      .pipe(
        map(recipes => new RecipesActions.LoadRecipesSuccess(recipes)),
        tap(console.log),
        catchError(error => of(new RecipesActions.LoadRecipesFail(error)))
      )
    )
  ));

}



