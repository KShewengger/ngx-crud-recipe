import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { RecipeDeleteModalComponent } from './recipe-delete-modal.component';
import { DebugElement } from '@angular/core';

import { RECIPE } from '@recipes/shared/mock/recipe.mock';


describe('RecipeDeleteModalComponent', () => {
  let component: RecipeDeleteModalComponent;
  let fixture: ComponentFixture<RecipeDeleteModalComponent>;
  let element: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeDeleteModalComponent ],
      providers: [
        { provide: BsModalRef, useValue: () => {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDeleteModalComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;

    component.recipe = RECIPE;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
