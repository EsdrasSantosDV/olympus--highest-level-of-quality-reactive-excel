import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { materialModules } from '../../../../shared/utils/material/material-module';

@Component({
  selector: 'app-exercicio-five-exemplo',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,...materialModules],
  templateUrl: './exercicio-five-exemplo.component.html',
  styleUrl: './exercicio-five-exemplo.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: ExercicioFiveExemploComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ExercicioFiveExemploComponent
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExercicioFiveExemploComponent implements ControlValueAccessor, Validator{

  quantity = signal(0);


  increment=input<number>(0);

  onChange = (quantity:number) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  onAdd() {
    this.markAsTouched();
    if (!this.disabled) {
      this.quantity.update((value)=> value +this.increment());
      this.onChange(this.quantity());
    }
  }

  onRemove() {
    this.markAsTouched();
    if (!this.disabled) {
      this.quantity.update((value)=> value -this.increment());
      this.onChange(this.quantity());
    }
  }

  writeValue(quantity: number) {
    this.quantity.set(quantity);
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const quantity = control.value;
    if (quantity <= 0) {
      return {
        mustBePositive: {
          quantity
        }
      };
    }
    else{
      return null;
    }
  }
}
