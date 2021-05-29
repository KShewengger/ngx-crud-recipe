import { Action } from '@ngrx/store';

import { Recipe } from '@recipes/shared';


// LOAD RECIPES
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


// REMOVE RECIPES
export const DELETE_RECIPE = '[Products] Remove Pizza';
export const DELETE_RECIPE_FAIL = '[Products] Remove Pizza Fail';
export const DELETE_RECIPE_SUCCESS = '[Products] Remove Pizza Success';


export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: Recipe) {}
}

export class DeleteRecipeFail implements Action {
  readonly type = DELETE_RECIPE_FAIL;
  constructor(public payload: any) {}
}

export class DeleteRecipeSuccess implements Action {
  readonly type = DELETE_RECIPE_SUCCESS;
  constructor(public payload: Recipe) {}
}


export type RecipesAction =
  | LoadRecipes
  | LoadRecipesFail
  | LoadRecipesSuccess
  | DeleteRecipe
  | DeleteRecipeSuccess
  | DeleteRecipeFail;

