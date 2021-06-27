import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RecipeDirectionFormComponent, RecipeIngredientFormComponent } from '@recipes/components';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';


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

  isUpdateForm$: Observable<boolean> = this.route.params.pipe(pluck('id'));

  constructor(
    private route: ActivatedRoute,
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
