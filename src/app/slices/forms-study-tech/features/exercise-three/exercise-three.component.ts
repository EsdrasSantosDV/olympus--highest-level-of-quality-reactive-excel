import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-exercise-three',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './exercise-three.component.html',
  styleUrl: './exercise-three.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:ViewEncapsulation.ShadowDom
})
export class ExerciseThreeComponent {
  private fb = inject(FormBuilder);

  pizzaForm = this.fb.group({
    size: ['', Validators.required],
    ingredients: this.fb.array([this.createIngredientFormGroup()])
  });

  get ingredients() {
    return this.pizzaForm.get('ingredients') as FormArray;
  }

  createIngredientFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required]
    });
  }

  addIngredient() {
    this.ingredients.push(this.createIngredientFormGroup());
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onSubmit() {
    console.log(this.pizzaForm.value);
  }
}
