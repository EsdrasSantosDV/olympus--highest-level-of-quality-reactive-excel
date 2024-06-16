import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { materialModules } from '../../../../shared/utils/material/material-module';

@Component({
  selector: 'app-form-adress',
  standalone: true,
  imports: [...materialModules,ReactiveFormsModule],
  templateUrl: './form-adress.component.html',
  styleUrl: './form-adress.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAdressComponent implements OnInit {

  @Input({ required: true }) controlKey = '';

  private parentContainer = inject(ControlContainer);
  private fb = inject(FormBuilder);
  ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.controlKey,
      this.fb.group({
        address: this.fb.control('', [Validators.required]),
        city: this.fb.control('', [Validators.required]),
        state: this.fb.control('', [Validators.required]),
        zipCode: this.fb.control('', [Validators.required]),
      })
    );
  }

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
}
