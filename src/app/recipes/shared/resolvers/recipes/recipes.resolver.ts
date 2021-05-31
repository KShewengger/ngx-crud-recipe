import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { getAllRecipes, ProductsState, Recipe } from '@recipes/shared';

import { SeoService } from '@core/services';
import { Tag } from '@core/models';
import { takeUntil, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements OnDestroy, Resolve<Recipe[]> {

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<ProductsState>,
    private seoService: SeoService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Recipe[]> {
    return this.store
      .select(getAllRecipes)
      .pipe(
        filter(recipes => !!recipes),
        take(1),
        tap(() => this.setSeoTags()),
        takeUntil(this.destroy$)
      );
  }

  setSeoTags(): void {
    const tags: Tag[] = [
      { name: 'title', content: 'Recipes' },
      { name: 'description', content: 'An Angular 12 application with Ngrx Store, Effects, and Router Store that performs CRUD operations for Food Recipes and using Mock API Calls with JSON Server.' }
    ];

    this.seoService.setSeoTags('Recipes', tags, 'updateTag');
  }


}
