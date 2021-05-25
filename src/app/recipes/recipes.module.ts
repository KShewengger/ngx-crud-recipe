import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RecipesRoutingModule } from '@recipes/recipes-routing.module';

import { pages } from '@recipes/pages';
import { components } from '@recipes/components';
import { directives, reducers, effects } from '@recipes/shared';


@NgModule({
  declarations: [
    ...pages,
    ...components,
    ...directives
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature(effects)
  ]
})
export class RecipesModule { }
