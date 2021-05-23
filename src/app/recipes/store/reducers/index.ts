import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { reducer as recipesReducer } from './recipes/recipes.reducer';
import { RecipeState } from '@recipes/shared/models/recipe.model';

export interface ProductsState {
  recipes: RecipeState;
}

export const reducers: ActionReducerMap<ProductsState, any> = {
  recipes: recipesReducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');
