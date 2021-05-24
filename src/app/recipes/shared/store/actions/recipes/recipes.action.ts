import { Action } from '@ngrx/store';

import { Recipe } from '@recipes/shared';


export const LOAD_RECIPES = '[Products] Load Recipes';
export const LOAD_RECIPES_FAIL = '[Products] Load Recipes Fail';
export const LOAD_RECIPES_SUCCESS = '[Products] Load Recipes Success';


export class LoadRecipes implements Action {
  readonly type = LOAD_RECIPES;
}

export class LoadRecipesFail implements Action {
  readonly type = LOAD_RECIPES_FAIL;

  constructor(public payload: any) {}
}

export class LoadRecipesSuccess implements Action {
  readonly type = LOAD_RECIPES_SUCCESS;

  constructor(public payload: Recipe[]) {}
}


export type RecipesAction =
  | LoadRecipes
  | LoadRecipesFail
  | LoadRecipesSuccess;

