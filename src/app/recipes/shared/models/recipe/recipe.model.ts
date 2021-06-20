import { EntityState } from '@ngrx/entity';

import { RecipeIngredient } from './recipe-ingredient.model';
import { RecipeImage } from './recipe-image.model';
import { RecipeDirection } from './recipe-direction.model';


export interface Recipe {
  id: string;
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

export interface RecipeState extends EntityState<Recipe> {
  entities: { [id: string]: Recipe };
  loaded: boolean;
  loading: boolean;
}
