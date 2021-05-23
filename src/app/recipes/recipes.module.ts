import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RecipesRoutingModule } from '@recipes/recipes-routing.module';

import { RecipesComponent } from '@recipes/pages/recipes/recipes.component';
import { RecipeComponent } from '@recipes/pages/recipe/recipe.component';
import { RecipeCardComponent } from '@recipes/components/recipe-card/recipe-card.component';

import { RecipeCardActiveDirective } from '@recipes/shared/directives/recipe-card-active/recipe-card-active.directive';
import { reducers, effects } from '@recipes/store';

import { RecipesGuard } from '@recipes/shared/guards/recipes.guard';


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeComponent,
    RecipeCardComponent,
    RecipeCardActiveDirective
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [ RecipesGuard ]
})
export class RecipesModule { }
