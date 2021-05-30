import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

import { Recipe } from '@recipes/shared';
import { getAllRecipes, ProductsState } from '@recipes/shared/store';

import { SeoService } from '@shared/services/seo/seo.service';
import { Tag } from '@shared/models';


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

  constructor(
    private store: Store<ProductsState>,
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.setSeoTags();
    this.initializeData();
    this.onSearchChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setSeoTags(): void {
    const tags: Tag[] = [
      { name: 'title', content: 'Recipes' },
      { name: 'description', content: 'An Angular 12 application with Ngrx Store, Effects, and Router Store that performs CRUD operations for Food Recipes and using Mock API Calls with JSON Server.' }
    ];

    this.seoService.setSeoTags('Recipes', tags, 'updateTag');
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
