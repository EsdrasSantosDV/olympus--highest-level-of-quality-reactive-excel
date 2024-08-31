import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-setup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  //templateUrl: './reactive-setup.component.html',]
  template: `
   <form [formGroup]="fighterForm">
      <div formGroupName="personalInfo">
        <label for="name">Nome do Lutador:</label>
        <input id="name" formControlName="name">
        <label for="country">País:</label>
        <input id="country" formControlName="country">
      </div>

      <div formGroupName="skills">
        <label for="specialMove">Golpe Especial:</label>
        <input id="specialMove" formControlName="specialMove">
        <label for="strength">Força:</label>
        <input id="strength" type="number" formControlName="strength">
      </div>


      <button type="submit" [disabled]="fighterForm.invalid">Registrar Lutador</button>
    </form>
`,
  styleUrl: './reactive-setup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveSetupComponent {
  fighterForm = new FormGroup({
    personalInfo: new FormGroup({
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    }),
    skills: new FormGroup({
      specialMove: new FormControl('', Validators.required),
      strength: new FormControl(50, [Validators.required, Validators.min(0), Validators.max(100)]),
    }),
  });













  fb=inject(FormBuilder)
  mediumForm = this.fb.group({
    name: this.fb.nonNullable.control('', { validators: [Validators.required] }),
    email: this.fb.control('', { validators: [Validators.required, Validators.email] }),
    phone: this.fb.control('', { validators: [Validators.required] }),
    address: this.fb.group({
      street: this.fb.control('', { validators: [Validators.required] }),
      city: this.fb.control('', { validators: [Validators.required] }),
      state: this.fb.control('', { validators: [Validators.required] }),
    }),
    companyName: this.fb.control('', { validators: [Validators.required] }),
    jobTitle: this.fb.control('', { validators: [Validators.required] }),
    startDate: this.fb.control('', { validators: [Validators.required] }),
    skills: this.fb.group({
      skill1: this.fb.control('', { validators: [Validators.required] }),
      skill2: this.fb.control('', { validators: [Validators.required] }),
      skill3: this.fb.control('', { validators: [Validators.required] }),
    }),
    emergencyContact: this.fb.group({
      contactName: this.fb.control('', { validators: [Validators.required] }),
      contactPhone: this.fb.control('', { validators: [Validators.required] }),
    }),
  });



  // mediumForm = new FormGroup({
  //   name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  //   email: new FormControl('', { validators: [Validators.required, Validators.email] }),
  //   phone: new FormControl('', { validators: [Validators.required] }),
  //   address: new FormGroup({
  //     street: new FormControl('', { validators: [Validators.required] }),
  //     city: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  //     state: new FormControl('', { validators: [Validators.required] }),
  //   }),
  //   companyName: new FormControl('', { validators: [Validators.required] }),
  //   jobTitle: new FormControl('', { validators: [Validators.required] }),
  //   startDate: new FormControl('', { validators: [Validators.required] }),
  //   skills: new FormGroup({
  //     skill1: new FormControl('', { validators: [Validators.required] }),
  //     skill2: new FormControl('', { validators: [Validators.required] }),
  //     skill3: new FormControl('', { validators: [Validators.required] }),
  //   }),
  //   emergencyContact: new FormGroup({
  //     contactName: new FormControl('', { validators: [Validators.required] }),
  //     contactPhone: new FormControl('', { validators: [Validators.required] }),
  //   }),
  // });


}
