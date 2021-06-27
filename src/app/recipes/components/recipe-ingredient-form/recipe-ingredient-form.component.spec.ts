import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeIngredientFormComponent } from './recipe-ingredient-form.component';

describe('RecipeIngredientFormComponent', () => {
  let component: RecipeIngredientFormComponent;
  let fixture: ComponentFixture<RecipeIngredientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeIngredientFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeIngredientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
