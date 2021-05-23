import { createSelector } from '@ngrx/store';

import { getRouterState } from '@core/store';
import { getProductsState, ProductsState } from '@recipes/store/reducers';
import * as RecipesReducer from '@recipes/store/reducers/recipes/recipes.reducer';

import { Recipe } from '@recipes/shared/models/recipe.model';


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
  entities => {
    console.log(entities);
    return Object.keys(entities).map(uuid => entities[uuid])
  });

export const getRecipesLoaded = createSelector(
  getRecipeState,
  RecipesReducer.getRecipesLoaded
);

export const getRecipesLoading = createSelector(
  getRecipeState,
  RecipesReducer.getRecipesLoading
);
