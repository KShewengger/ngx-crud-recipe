import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-recipe-delete-modal',
  templateUrl: './recipe-delete-modal.component.html'
})
export class RecipeDeleteModalComponent {

  @Input()
  title: string;

  @Output()
  confirm$: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public bsModalRef: BsModalRef) { }

  confirmDelete(): void {
    this.confirm$.next(true);
    this.close();
  }

  close(): void {
    this.bsModalRef.hide();
  }

}
