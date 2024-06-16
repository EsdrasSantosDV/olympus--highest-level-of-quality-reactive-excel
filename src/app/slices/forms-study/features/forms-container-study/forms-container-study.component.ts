import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { materialModules } from '../../../../shared/utils/material/material-module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { getFormControlValueAsType } from '../../utils/functions-form';
import { FormAdressComponent } from '../../ui/form-adress/form-adress.component';
import { CommonModule } from '@angular/common';
import { FormFamilyComponent } from '../../ui/form-family/form-family.component';
import { tap } from 'rxjs';

@Component({
  selector: 'app-forms-container-study',
  standalone: true,
  templateUrl: './forms-container-study.component.html',
  styleUrl: './forms-container-study.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ...materialModules,
    CommonModule,
    ReactiveFormsModule,
    FormAdressComponent,
    FormFamilyComponent,
  ],
})
export class FormsContainerStudyComponent implements OnInit {
  fb = inject(FormBuilder);

  formGroup = this.fb.group({
    fullName: this.fb.control(''),
    email: this.fb.control(''),
    birthDate: this.fb.control(''),
    phoneNumber: this.fb.control(''),
  });

  ngOnInit(): void {
    this.formGroup
      .get('adressForm')
      ?.valueChanges.pipe(tap(value => console.log('esdras', value)))
      .subscribe();
  }

  saveData() {
    console.log(this.formGroup.getRawValue());
    this.formGroup.reset();
  }
}
