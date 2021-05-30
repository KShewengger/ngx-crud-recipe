import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';
import { takeUntil, tap, filter } from 'rxjs/operators';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { RecipeDeleteModalComponent } from '@recipes/components/recipe-delete-modal/recipe-delete-modal.component';
import { getSelectedRecipe, ProductsState, DeleteRecipe } from '@recipes/shared/store';
import { Recipe } from '@recipes/shared/models';

import { SeoService } from '@shared/services/seo/seo.service';


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
    private store: Store<ProductsState>,
    private seoService: SeoService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.recipe$ = this.store
      .select(getSelectedRecipe)
      .pipe(
        filter(recipe => !!recipe),
        tap(recipe => this.setSeoTags(recipe)),
        takeUntil(this.destroy$)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setSeoTags({ title, description }: Recipe): void {
    const tags = [
      { name: 'title', content: title },
      { name: 'description', content: description }
    ];

    this.seoService.setSeoTags(title, tags, 'updateTag');
  }

  initializeDeleteModal(recipe: Recipe): BsModalRef {
    const options = {
      class: 'modal-dialog-centered',
      initialState: { recipe }
    };

    return this.modalService.show(RecipeDeleteModalComponent, options);
  }

  deleteRecipe(recipe: Recipe): void {
    const modalRef = this.initializeDeleteModal(recipe);

    modalRef
      .content
      .confirm$
      .pipe(takeUntil(this.destroy$))
      .subscribe((recipe: Recipe) => this.store.dispatch(new DeleteRecipe(recipe)));
  }

}
