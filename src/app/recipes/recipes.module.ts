import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from '@recipes/recipes-routing.module';

import { RecipesComponent } from '@recipes/pages/recipes/recipes.component';
import { RecipeComponent } from '@recipes/pages/recipe/recipe.component';
import { RecipeCardComponent } from '@recipes/components/recipe-card/recipe-card.component';

import { RecipeCardActiveDirective } from '@recipes/shared/directives/recipe-card-active/recipe-card-active.directive';


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeComponent,
    RecipeCardComponent,
    RecipeCardActiveDirective
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule { }
