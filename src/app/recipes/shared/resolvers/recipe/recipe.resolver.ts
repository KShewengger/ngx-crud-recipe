import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil, tap } from 'rxjs/operators';

import { getSelectedRecipe, ProductsState, Recipe } from '@recipes/shared';

import { SeoService } from '@core/services';
import { Tag } from '@core/models';


@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements OnDestroy, Resolve<Recipe> {

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<ProductsState>,
    private seoService: SeoService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Recipe> {
    return this.store
      .select(getSelectedRecipe)
      .pipe(
        filter(recipe => !!recipe),
        take(1),
        tap(recipe => this.setSeoTags(recipe)),
        takeUntil(this.destroy$)
      );
  }

  setSeoTags({ title, description }: Recipe): void {
    const tags: Tag[] = [
      { name: 'title', content: title },
      { name: 'description', content: description }
    ];

    this.seoService.setSeoTags(title, tags, 'updateTag');
  }


}
