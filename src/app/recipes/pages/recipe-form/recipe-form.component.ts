import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';

import { RecipeDirectionFormComponent, RecipeIngredientFormComponent } from '@recipes/components';


@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeFormComponent implements AfterViewInit {

  @ViewChild('ingredients', { read: ViewContainerRef })
  ingredientsContainerRef: ViewContainerRef;

  @ViewChild('directions', { read: ViewContainerRef })
  directionsContainerRef: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver
  ) { }

  ngAfterViewInit() {
    this.generateIngredientInput();
    this.generateDirectionInput();
  }

  generateIngredientInput(): void {
    const component = this.resolver.resolveComponentFactory(RecipeIngredientFormComponent);
    this.ingredientsContainerRef.createComponent(component);
    // const instance = container.instance as RecipeIngredientFormComponent;
  }

  generateDirectionInput(): void {
    const component = this.resolver.resolveComponentFactory(RecipeDirectionFormComponent);
    this.directionsContainerRef.createComponent(component);
    // const instance = container.instance as RecipeIngredientFormComponent;
  }

}
