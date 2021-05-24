import { Component, Input } from '@angular/core';

import { Recipe } from '@recipes/shared';


@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent {

  @Input() recipe: Recipe;

  constructor() { }

}
