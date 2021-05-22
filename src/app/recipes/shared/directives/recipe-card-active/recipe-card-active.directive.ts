import { Directive, HostListener, HostBinding } from '@angular/core';


@Directive({
  selector: '[recipeCardActive]'
})
export class RecipeCardActiveDirective {

  @HostBinding('class.recipe-card--active') active: boolean = false;

  @HostListener('mousedown', ['$event'])
  onClick() {
    this.active = true;
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.active = false;
  }

}
