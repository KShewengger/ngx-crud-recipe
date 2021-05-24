import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent, RecipeComponent } from '@recipes/pages';
import { RecipesGuard } from '@recipes/shared';


const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [ RecipesGuard ]
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
