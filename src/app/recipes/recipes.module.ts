import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from '@recipes/recipes-routing.module';

import { RecipesComponent } from '@recipes/pages/recipes/recipes.component';
import { RecipeComponent } from '@recipes/pages/recipe/recipe.component';


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule { }
