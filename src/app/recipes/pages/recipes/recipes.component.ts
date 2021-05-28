import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

import { Recipe } from '@recipes/shared';
import { getAllRecipes, ProductsState } from '@recipes/shared/store';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit, OnDestroy {

  recipes$: Observable<Recipe[]>;
  search$: Subject<string> = new Subject<string>();
  destroy$: Subject<boolean> = new Subject<boolean>();

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
    const filterRecipes$ = (value: string) => this.recipes$
      .pipe(
        map(recipes => recipes.filter(({ title }) => title.toLowerCase().includes(value.toLowerCase())))
      );

    const searchRecipe$ = this.search$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(filterRecipes$),
        takeUntil(this.destroy$)
      );

    searchRecipe$.subscribe(recipes => this.recipes = recipes);
  }

}
