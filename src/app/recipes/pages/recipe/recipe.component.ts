import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { getSelectedRecipe, ProductsState } from '@recipes/shared/store';
import { Recipe } from '@recipes/shared/models';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeComponent implements OnInit, OnDestroy {

  recipe$: Observable<Recipe>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<ProductsState>) { }

  ngOnInit(): void {
    this.recipe$ = this.store
      .select(getSelectedRecipe)
      .pipe(takeUntil(this.destroy$))
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
