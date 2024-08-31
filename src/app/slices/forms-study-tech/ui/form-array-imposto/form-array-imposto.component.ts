import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-array-imposto',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form-array-imposto.component.html',
  styleUrl: './form-array-imposto.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormArrayImpostoComponent {
  taxForm = new FormGroup({
    taxes: new FormArray([
      this.createTaxFormGroup()
    ])
  });

  get taxes() {
    return this.taxForm.get('taxes') as FormArray;
  }

  createTaxFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      rate: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)])
    });
  }

  addTax() {
    this.taxes.push(this.createTaxFormGroup());
  }

  removeTax(index: number) {
    this.taxes.removeAt(index);
  }
}
