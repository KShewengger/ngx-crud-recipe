import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';
import { takeUntil, pluck } from 'rxjs/operators';

import { deleteRecipe } from '@recipes/shared/store';
import { Recipe, RecipeState } from '@recipes/shared/models';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeComponent implements OnInit, OnDestroy {

  recipe$: Observable<Recipe>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private store: Store<RecipeState>
  ) { }

  ngOnInit(): void {
    this.recipe$ = this.route.data
      .pipe(
        pluck('recipe'),
        takeUntil(this.destroy$)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onRecipeModalResponse(recipe: Recipe): void {
    this.store.dispatch(deleteRecipe({ recipe }));
  }

}
