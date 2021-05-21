import { Component, OnInit } from '@angular/core';

import { RecipeService } from '@recipes/shared/services/recipe/recipe.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe(res => console.log(res));
  }

}
