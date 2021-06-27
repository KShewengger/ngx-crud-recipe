import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDirectionFormComponent } from './recipe-direction-form.component';

describe('RecipeIngredientFormComponent', () => {
  let component: RecipeDirectionFormComponent;
  let fixture: ComponentFixture<RecipeDirectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeDirectionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDirectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
