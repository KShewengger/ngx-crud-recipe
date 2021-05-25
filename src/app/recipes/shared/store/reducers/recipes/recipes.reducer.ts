import * as fromActions from '@recipes/shared/store/actions';
import { Recipe, RecipeState } from '@recipes/shared';


export const initialState: RecipeState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(state: RecipeState = initialState, action: fromActions.RecipesAction): RecipeState {

  switch (action.type) {
    case fromActions.LOAD_RECIPES: {
      return {
        ...state,
        loading: true
      };
    }

    case fromActions.LOAD_RECIPES_SUCCESS: {
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

    case fromActions.LOAD_RECIPES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    default: {
      return state;
    }

  }

}


export const getRecipesLoading = (state: RecipeState) => state.loading;
export const getRecipesLoaded = (state: RecipeState) => state.loaded;
export const getRecipesEntities = (state: RecipeState) => state.entities;
