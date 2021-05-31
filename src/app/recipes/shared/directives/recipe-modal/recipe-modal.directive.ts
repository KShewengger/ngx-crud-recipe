import { Directive, HostListener, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { RecipeDeleteModalComponent } from '@recipes/components';
import { Recipe } from '@recipes/shared';


@Directive({
  selector: '[recipeModal]'
})
export class RecipeModalDirective implements OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  options: { class: string, initialState: { recipe: Recipe } };

  @Input()
  recipeModal: 'delete';

  @Input()
  set recipeModalData(recipe: Recipe) {
    this.options = {
      class: 'modal-dialog-centered',
      initialState: { recipe }
    };
  }

  @Output()
  recipeModalResponse: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  @HostListener('click')
  onClick(): void {
    if (this.recipeModal === 'delete')
      this.showDeleteModal();
  }

  constructor(private modalService: BsModalService) { }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  showDeleteModal(): void {
    const modalRef: BsModalRef = this.modalService.show(RecipeDeleteModalComponent, this.options);

    modalRef
      .content
      .confirm$
      .pipe(takeUntil(this.destroy$))
      .subscribe((recipe: Recipe) => this.recipeModalResponse.next(recipe));
  }

}
