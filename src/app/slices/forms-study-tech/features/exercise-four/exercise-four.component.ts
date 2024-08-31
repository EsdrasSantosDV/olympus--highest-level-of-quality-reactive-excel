import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-exercise-four',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './exercise-four.component.html',
  styleUrl: './exercise-four.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseFourComponent implements OnInit{
  fb = inject(FormBuilder);

  documentForm = this.fb.record<FormControl>({});
  //Isso seria vindo de uma request do back
  documentAtribute=signal<DocumentationAttribute[]> ( [
    { key: 'title', value: 'Documento XYZ', type: 'string' },
    { key: 'pageCount', value: 100, type: 'number' },
    { key: 'lastUpdated', value: '2023-08-27', type: 'date' },
    { key: 'isPublished', value: true, type: 'boolean' }
  ]);

  ngOnInit(): void {
    this.setupForm(this.documentAtribute());
  }

  setupForm(attributes: DocumentationAttribute[]) {
    attributes.forEach(attribute => {
      const type=attribute.type;
      const key=attribute.key;
      const value=attribute.value
      switch (type) {
        case 'string':
          this.documentForm.addControl(key, this.fb.control<string | null>(value, [Validators.required]));
          break;
        case 'number':
          this.documentForm.addControl(key, this.fb.control<number | null>(value, [Validators.required, Validators.min(0)]));
          break;
        case 'date':
          this.documentForm.addControl(key, this.fb.control<Date | null>(value, [Validators.required]));
          break;
        case 'boolean':
          this.documentForm.addControl(key, this.fb.control<boolean | null>(value, [Validators.required]));
          break;
        default:
          this.documentForm.addControl(key, this.fb.control<string | null>(value, [Validators.required]));
      }

    });
  }



  get formControls() {
    return this.documentForm.controls;
  }

  get formKeys() {
    return Object.keys(this.documentForm.controls);
  }




  removeAttribute(key: string) {
    this.documentForm.removeControl(key);
    this.documentAtribute.update(attributes => attributes.filter(attr => attr.key !== key));
  }

  onSubmit() {
    console.log("Form data:", this.documentForm.value);
  }

}
interface DocumentationAttribute {
  key: string;
  value: any;
  type: 'string' | 'number' | 'date' | 'boolean';
}








/* MINHA COLA
 // newAttributeName = signal<string>('');
  // newAttributeType = signal<'string' | 'number' | 'date' | 'boolean'>('string');
 addAttribute() {
    const name = this.newAttributeName();
    const type = this.newAttributeType();
    if (name && !this.documentForm.contains(name)) {
      this.addControlToForm(name, '', type);
      this.documentAtribute.update(attributes => [...attributes, { key: name, value: '', type }]);
      this.newAttributeName.set('');
    }
  }


  addControlToForm(key: string, value: any, type: string) {
    switch (type) {
      case 'string':
        this.documentForm.addControl(key, this.fb.control<string | null>(value, [Validators.required]));
        break;
      case 'number':
        this.documentForm.addControl(key, this.fb.control<number | null>(value, [Validators.required, Validators.min(0)]));
        break;
      case 'date':
        this.documentForm.addControl(key, this.fb.control<Date | null>(value, [Validators.required]));
        break;
      case 'boolean':
        this.documentForm.addControl(key, this.fb.control<boolean | null>(value, [Validators.required]));
        break;
      default:
        this.documentForm.addControl(key, this.fb.control<string | null>(value, [Validators.required]));
    }
  }
<!--


<form [formGroup]="documentForm" (ngSubmit)="onSubmit()">
  <h2>Preencha os Detalhes do Documento</h2>

  <div class="form-group">
    <label for="newAttributeName">Nome do Novo Atributo:</label>
    <input type="text" id="newAttributeName" [(ngModel)]="newAttributeName" [ngModelOptions]="{standalone: true}" placeholder="Ex: Novo Atributo">
  </div>

  <div class="form-group">
    <label for="newAttributeType">Tipo do Atributo:</label>
    <select id="newAttributeType" [(ngModel)]="newAttributeType" [ngModelOptions]="{standalone: true}">
      <option value="string">Texto</option>
      <option value="number">Número</option>
      <option value="date">Data</option>
      <option value="boolean">Booleano</option>
    </select>
  </div>

  <button type="button" (click)="addAttribute()">Adicionar Atributo</button>

  <div *ngIf="documentAtribute().length > 0">
    <h3>Atributos Adicionados:</h3>
    <div *ngFor="let attr of documentAtribute()">
      <div class="attribute-item">
        <label [for]="attr.key">{{ attr.key | titlecase }}:</label>
        <input *ngIf="attr.type === 'string'" type="text" [id]="attr.key" [formControlName]="attr.key">
        <input *ngIf="attr.type === 'number'" type="number" [id]="attr.key" [formControlName]="attr.key">
        <input *ngIf="attr.type === 'date'" type="date" [id]="attr.key" [formControlName]="attr.key">
        <input *ngIf="attr.type === 'boolean'" type="checkbox" [id]="attr.key" [formControlName]="attr.key">
      </div>
    </div>
  </div>

  <button type="submit" [disabled]="documentForm.invalid">Salvar Documento</button>
</form>

<pre>{{ documentForm.value | json }}</pre> -->



*/
