import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent, RecipeComponent, RecipeFormComponent } from '@recipes/pages';
import { RecipesGuard, RecipeGuard, RecipesResolver } from '@recipes/shared';


const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [ RecipesGuard ],
    resolve: {
      recipes: RecipesResolver
    }
  },
  {
    path: 'form',
    component: RecipeFormComponent
  },
  {
    path: ':id',
    component: RecipeComponent,
    canActivate: [ RecipeGuard ]
  },
  {
    path: ':id/form',
    component: RecipeFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
