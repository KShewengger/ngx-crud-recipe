import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { RestService } from '@recipes/shared/services/rest.service';

import { API_URL } from '@app/shared/tokens/api-url.token';
import { Recipe } from '@recipes/shared/models/recipe.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeService extends RestService {

  constructor(
    protected http: HttpClient,
    @Inject(API_URL) protected apiUrl: string
  ) {
    super(http, apiUrl);

    console.log(apiUrl);
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.get<Recipe[]>('recipes');
  }

  getRecipe(uuid: string): Observable<Recipe> {
    return this.get<Recipe>('recipe', uuid);
  }

}
