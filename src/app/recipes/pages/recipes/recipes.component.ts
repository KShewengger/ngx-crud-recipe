import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

import { Recipe } from '@recipes/shared/models/recipe.model';
import { RecipeService } from '@recipes/shared/services/recipe/recipe.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit, OnDestroy {

  search$: Subject<string> = new Subject<string>();
  destroy$: Subject<boolean> = new Subject<boolean>();

  recipes: Recipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.initializeData();
    this.onSearchChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  initializeData(): void {
    this.recipeService
      .getAllRecipes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(recipes => this.recipes = recipes);
  }

  onSearchChange(): void {
    this.search$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value =>
          this.recipeService
            .getAllRecipes()
            .pipe(
              map(recipes => recipes.filter(({ title }) => title.toLowerCase().includes(value.toLowerCase())))
            )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(recipes => this.recipes = recipes);
  }

}
