import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Recipe } from '@recipes/shared';
import { API_URL } from '@core/tokens';

import { RestService } from '@recipes/shared/services/rest/rest.service';


@Injectable({
  providedIn: 'root'
})
export class RecipeService extends RestService {

  constructor(
    protected http: HttpClient,
    @Inject(API_URL) protected apiUrl: string
  ) {
    super(http, apiUrl);
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.get<Recipe[]>('recipes');
  }

  getRecipe(uuid: string): Observable<Recipe> {
    return this.get<Recipe>('recipe', uuid);
  }

}
