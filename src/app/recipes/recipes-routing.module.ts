import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from '@recipes/pages/recipes/recipes.component';
import { RecipeComponent } from '@recipes/pages/recipe/recipe.component';


const routes: Routes = [
  {
    path: '',
    component: RecipesComponent
  },
  {
    path: ':id',
    component: RecipeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
