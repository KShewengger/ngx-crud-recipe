import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import * as RecipesActions from '@recipes/shared/store/actions';
import { Recipe, RecipeState } from '@recipes/shared';
import { Action, createReducer, on, State } from '@ngrx/store';


export const recipeAdapter: EntityAdapter<Recipe> = createEntityAdapter<Recipe>();

const {
  selectIds,
  selectEntities,
  selectAll,
} = recipeAdapter.getSelectors();

export const initialState: RecipeState = recipeAdapter.getInitialState({
  entities: null,
  loaded: false,
  loading: false,
});

const recipesReducer = createReducer(
  initialState,
  on(
    RecipesActions.loadRecipes,
    state => ({
      ...state,
      loading: true
    })
  ),
  on(
    RecipesActions.loadRecipesSuccess,
    (state, { recipes }) => recipeAdapter.setAll(
      recipes,
      {
        ...state,
        loading: false,
        loaded: true
      }
    )
  ),
  on(
    RecipesActions.loadRecipesFail,
    state => ({
      ...state,
      loading: false,
      loaded: false
    })
  ),
  on(
    RecipesActions.loadRecipesFail,
    state => ({
      ...state,
      loading: false,
      loaded: false
    })
  ),
  on(
   RecipesActions.deleteRecipeSuccess,
    (state, { recipe }) => recipeAdapter.removeOne(recipe.id, state)
  )
);

export const selectRecipesIds = selectIds;
export const selectRecipesEntities = selectEntities;
export const selectRecipes = selectAll;

export function reducer(state: RecipeState | undefined, action: Action) {
  return recipesReducer(state, action);
}
