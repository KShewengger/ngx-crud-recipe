import { RecipeIngredient } from './recipe-ingredient.model';
import { RecipeImage } from './recipe-image.model';
import { RecipeDirection } from './recipe-direction.model';


export interface Recipe {
  uuid: string;
  title: string;
  description: string;
  images: RecipeImage,
  servings: number;
  prepTime: number;
  cookTime: number;
  postDate: Date;
  editDate: Date;
  ingredients: RecipeIngredient[];
  directions: RecipeDirection[];
}

export interface RecipeState {
  entities: { [id: string]: Recipe };
  loaded: boolean;
  loading: boolean;
}
