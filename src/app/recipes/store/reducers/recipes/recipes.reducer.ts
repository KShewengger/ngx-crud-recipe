import * as Action from '@recipes/store/actions/recipes/recipes.action';

import { Recipe, RecipeState } from '@recipes/shared/models/recipe.model';


export const initialState: RecipeState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(state: RecipeState = initialState, action: Action.RecipesAction): RecipeState {

  switch (action.type) {
    case Action.LOAD_RECIPES: {
      return {
        ...state,
        loading: true
      };
    }

    case Action.LOAD_RECIPES_SUCCESS: {
      const entities = action
        .payload
        .reduce((stateEntities: { [id: string]: Recipe }, recipe: Recipe) =>
            ({ ...stateEntities, [recipe.uuid]: recipe }),
          { ...state.entities }
        );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case Action.LOAD_RECIPES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;

}


export const getRecipesLoading = (state: RecipeState) => state.loading;
export const getRecipesLoaded = (state: RecipeState) => state.loaded;
export const getRecipesEntities = (state: RecipeState) => state.entities;
