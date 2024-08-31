import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormRecord, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-record',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './form-record.component.html',
  styleUrl: './form-record.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormRecordComponent implements OnInit {

  fb = inject(FormBuilder);


  fighterForm = this.fb.record<FormControl>({});

  nameSIG=signal('')


  ngOnInit(): void {
   // Simulação de um objeto vindo do backend
   const fighterData = {
    forca: '80',
    velocidade: '75',
    resistencia: '90',
    agilidade: '85'
  };

  this.setupForm(fighterData);
  }

  setupForm(attributes: { [key: string]: string }) {
    Object.keys(attributes).forEach(key => {
      this.fighterForm.addControl(key, this.fb.control(attributes[key], [Validators.required]));
    });
  }


  get attributes() {
    return this.fighterForm;
  }

  get attributeKeys() {
    return Object.keys(this.fighterForm.controls)
  }

  addAttribute() {
    const name = this.nameSIG()
    if (name && !this.fighterForm.contains(name)) {
      this.fighterForm.addControl(name, this.fb.control('', [Validators.required]));
      this.nameSIG.set('')
    }
  }

  removeAttribute(key: string) {
    this.fighterForm.removeControl(key);
  }


  onSubmit() {
    console.log("esdras",this.fighterForm.value);
  }
}
