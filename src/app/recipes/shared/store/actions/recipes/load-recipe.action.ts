import { createAction, props } from '@ngrx/store';
import { Recipe } from '@recipes/shared';


export const loadRecipes = createAction(
  '[Products] Load Recipes'
);

export const loadRecipesFail = createAction(
  '[Products] Load Recipes Fail',
  props<{
    error: any
  }>()
);

export const loadRecipesSuccess = createAction(
  '[Products] Load Recipes Success',
  props<{
    recipes: Recipe[]
  }>()
)
