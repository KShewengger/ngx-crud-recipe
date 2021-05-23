import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap, map, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { Recipe } from '@recipes/shared/models/recipe.model';
import { RecipeService } from '@recipes/shared/services/recipe/recipe.service';

import { getAllRecipes, ProductsState } from '@recipes/store';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit, OnDestroy {

  search$: Subject<string> = new Subject<string>();
  destroy$: Subject<boolean> = new Subject<boolean>();

  recipes$: Observable<Recipe[]>;
  recipes: Recipe[];

  constructor(private store: Store<ProductsState>) { }

  ngOnInit(): void {
    this.initializeData();
    this.onSearchChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  initializeData(): void {
    this.recipes$ = this.store.select(getAllRecipes);

    this.recipes$
      .pipe(takeUntil(this.destroy$))
      .subscribe(recipes => this.recipes = recipes);
  }

  onSearchChange(): void {
    this.search$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value =>
          this.recipes$
            .pipe(
              map(recipes => recipes.filter(({ title }) => title.toLowerCase().includes(value.toLowerCase())))
            )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(recipes => this.recipes = recipes);
  }

}
