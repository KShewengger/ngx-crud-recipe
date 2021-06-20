import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap, map, pluck } from 'rxjs/operators';

import { Recipe } from '@recipes/shared';


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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeRecipes();
    this.onSearchChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  initializeRecipes(): void {
    this.recipes$ = this.route.data.pipe(
      pluck('recipes'),
      takeUntil(this.destroy$)
    );

    this.recipes$.subscribe(recipes => this.recipes = recipes);
  }

  onSearchChange(): void {
    const filterRecipes$ = (value: string) => this.recipes$
      .pipe(map(recipes => recipes.filter(({ title }) => title.toLowerCase().includes(value.toLowerCase()))));

    this.search$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(filterRecipes$),
        takeUntil(this.destroy$)
      )
      .subscribe(recipes => this.recipes = recipes);
  }

}
