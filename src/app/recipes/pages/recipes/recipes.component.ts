import { Component, OnInit } from '@angular/core';

import { RecipeService } from '@recipes/shared/services/recipe/recipe.service';
import { Observable } from 'rxjs';

import { Recipe } from '@recipes/shared/models/recipe.model';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipes$: Observable<Recipe[]>;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes$ = this.recipeService.getAllRecipes();
  }

}
