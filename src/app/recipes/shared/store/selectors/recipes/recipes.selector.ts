import { createFeatureSelector, createSelector } from '@ngrx/store';

import { getRouterState } from '@core/store';

import { RecipeState } from '@recipes/shared/models/recipe/recipe.model';
import * as RecipeReducer from '@recipes/shared/store/reducers';
import { Observable } from 'rxjs';


export const selectRecipesState = createFeatureSelector<RecipeState>('recipes');

export const selectAllRecipes = createSelector(
  selectRecipesState,
  RecipeReducer.selectRecipes
);

export const selectAllRecipesIds = createSelector(
  selectRecipesState,
  RecipeReducer.selectRecipesIds
)

export const selectAllRecipesEntities = createSelector(
  selectRecipesState,
  RecipeReducer.selectRecipesEntities
);

export const selectRecipesLoading = createSelector(
  selectRecipesState,
  (state: RecipeState) => state.loading
);

export const selectRecipesLoaded = createSelector(
  selectRecipesState,
  (state: RecipeState) => state.loaded
);

export const selectCurrentRecipe = createSelector(
  selectAllRecipesEntities,
  getRouterState,
  (entities, router) => router.state && entities[router.state.params.id]
);
