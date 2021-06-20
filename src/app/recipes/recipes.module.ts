import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ModalModule } from 'ngx-bootstrap/modal';

import { RecipesRoutingModule } from '@recipes/recipes-routing.module';

import { pages } from '@recipes/pages';
import { components } from '@recipes/components';
import { directives, reducer, effects } from '@recipes/shared';


@NgModule({
  declarations: [
    ...pages,
    ...components,
    ...directives
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    RecipesRoutingModule,
    StoreModule.forFeature('recipes', reducer),
    EffectsModule.forFeature(effects)
  ]
})
export class RecipesModule { }
