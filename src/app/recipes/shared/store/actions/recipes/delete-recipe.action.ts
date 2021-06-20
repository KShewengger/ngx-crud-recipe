import { createAction, props } from '@ngrx/store';
import { Recipe } from '@recipes/shared';


export const deleteRecipe = createAction(
  '[Products] Remove Pizza',
  props<{
    recipe: Recipe
  }>()
);

export const deleteRecipeFail = createAction(
  '[Products] Remove Pizza Fail',
  props<{
    error: any
  }>()
);

export const deleteRecipeSuccess = createAction(
  '[Products] Remove Pizza Success',
  props<{
    recipe: Recipe
  }>()
);
