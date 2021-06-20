import { Injectable, OnDestroy } from '@angular/core';
import { Resolve } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil, tap } from 'rxjs/operators';

import { Recipe, RecipeState, selectCurrentRecipe } from '@recipes/shared';

import { SeoService } from '@core/services';
import { Tag } from '@core/models';


@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements OnDestroy, Resolve<Recipe> {

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<RecipeState>,
    private seoService: SeoService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  resolve(): Observable<Recipe> {
    return this.store
      .pipe(
        select(selectCurrentRecipe),
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
