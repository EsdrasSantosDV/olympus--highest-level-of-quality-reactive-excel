import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValidationUniqueComponent } from "../../ui/validation-unique/validation-unique.component";
import { FormArrayImpostoComponent } from "../../ui/form-array-imposto/form-array-imposto.component";
import { FormRecordComponent } from "../../ui/form-record/form-record.component";

@Component({
  selector: 'app-componente-de-explicacao',
  standalone: true,
  imports: [FormsModule, CommonModule, ValidationUniqueComponent, FormArrayImpostoComponent, FormRecordComponent],
  templateUrl: './componente-de-explicacao.component.html',
  styleUrl: './componente-de-explicacao.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponenteDeExplicacaoComponent {
  competitor: Competitor = {
    name: '',
    belt: '',
    weightClass: '',
    competitionDate: null,
    address: {
      street: '',
      city: '',
      state: ''
    }
  };
}
export interface Competitor {
  name: string;
  belt: string;
  weightClass: string;
  competitionDate: Date | null;
  address: Address;
}
export interface Address {
  street: string;
  city: string;
  state: string;
}
