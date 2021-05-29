import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { Recipe } from '@recipes/shared';


@Component({
  selector: 'app-recipe-delete-modal',
  templateUrl: './recipe-delete-modal.component.html'
})
export class RecipeDeleteModalComponent {

  @Input()
  recipe: Recipe;

  @Output()
  confirm$: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  constructor(public bsModalRef: BsModalRef) { }

  confirmDelete(): void {
    this.confirm$.next(this.recipe);
    this.close();
  }

  close(): void {
    this.bsModalRef.hide();
  }

}
