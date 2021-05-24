import { createSelector } from '@ngrx/store';

import { getRouterState } from '@core/store';
import { getProductsState, ProductsState, Recipe } from '@recipes/shared';
import * as RecipesReducer from '@recipes/shared/store/reducers/recipes/recipes.reducer';


export const getRecipeState = createSelector(
  getProductsState,
  (state: ProductsState) => state.recipes
);

export const getRecipesEntities = createSelector(
  getRecipeState,
  RecipesReducer.getRecipesEntities
);

export const getSelectedRecipe = createSelector(
  getRecipesEntities,
  getRouterState,
  (entities, router): Recipe => router.state && entities[router.state.params.id]
);

export const getAllRecipes = createSelector(
  getRecipesEntities,
  entities => Object.keys(entities).map(uuid => entities[uuid]));

export const getRecipesLoaded = createSelector(
  getRecipeState,
  RecipesReducer.getRecipesLoaded
);

export const getRecipesLoading = createSelector(
  getRecipeState,
  RecipesReducer.getRecipesLoading
);
