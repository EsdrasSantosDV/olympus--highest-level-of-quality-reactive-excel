import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ExercicioFiveExemploComponent } from '../../ui/exercicio-five-exemplo/exercicio-five-exemplo.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercise-five',
  standalone: true,
  imports: [ExercicioFiveExemploComponent,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './exercise-five.component.html',
  styleUrl: './exercise-five.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseFiveComponent {

  fb = inject(FormBuilder);

  parentForm= this.fb.group({
    productQuantity: [5]
  });

  onSubmit() {
    console.log("Form submitted with value:", this.parentForm.value);
  }

  productQuantity = signal(5);
}
