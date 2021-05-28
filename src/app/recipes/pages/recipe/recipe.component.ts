import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { RecipeDeleteModalComponent } from '@recipes/components/recipe-delete-modal/recipe-delete-modal.component';

import { getSelectedRecipe, ProductsState } from '@recipes/shared/store';
import { Recipe } from '@recipes/shared/models';


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
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.recipe$ = this.store
      .select(getSelectedRecipe)
      .pipe(takeUntil(this.destroy$))
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  deleteRecipe(title: string): void {
    const modalRef = this.initializeDeleteModal(title);

    modalRef
      .content
      .confirm$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isConfirm: boolean) => console.log(isConfirm));
  }

  initializeDeleteModal(title: string): BsModalRef {
    const options = {
      class: 'modal-dialog-centered',
      initialState: { title }
    };

    return this.modalService.show(RecipeDeleteModalComponent, options);
  }

}
