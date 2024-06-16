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
  selector: 'app-form-family',
  standalone: true,
  imports: [...materialModules, ReactiveFormsModule],
  templateUrl: './form-family.component.html',
  styleUrls: ['./form-family.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFamilyComponent implements OnInit {

  @Input({ required: true }) controlKey = '';

  private parentContainer = inject(ControlContainer);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.controlKey,
      this.fb.group({
        familyName: this.fb.control('', [Validators.required]),
        numberOfMembers: this.fb.control('', [Validators.required, Validators.min(1)]),
        primaryContact: this.fb.control('', [Validators.required, Validators.email]),
      })
    );
  }

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
}
