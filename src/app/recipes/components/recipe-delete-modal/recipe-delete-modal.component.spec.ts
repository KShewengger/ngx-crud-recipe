import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDeleteModalComponent } from './recipe-delete-modal.component';

describe('RecipeDeleteModalComponent', () => {
  let component: RecipeDeleteModalComponent;
  let fixture: ComponentFixture<RecipeDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeDeleteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
