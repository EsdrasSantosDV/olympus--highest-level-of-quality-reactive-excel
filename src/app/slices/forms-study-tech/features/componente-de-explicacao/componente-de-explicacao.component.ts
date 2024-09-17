import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValidationUniqueComponent } from '../../ui/validation-unique/validation-unique.component';
import { FormArrayImpostoComponent } from '../../ui/form-array-imposto/form-array-imposto.component';
import { FormRecordComponent } from '../../ui/form-record/form-record.component';
import {
  distinctUntilChanged,
  filter,
  map,
  of,
  scan,
  take,
  takeLast,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-componente-de-explicacao',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ValidationUniqueComponent,
    FormArrayImpostoComponent,
    FormRecordComponent,
  ],
  templateUrl: './componente-de-explicacao.component.html',
  styleUrl: './componente-de-explicacao.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      state: '',
    },
  };

  constructor() {
    // Observable que emite uma sequência de números
    const numbers$ = of(1, 1, 2, 3, 4, 4, 5, 6, 7);

    // Usamos a função pipe() para aplicar vários operadores
    numbers$
      .pipe(
        // Remove valores consecutivos duplicados
        distinctUntilChanged(),
        // Filtra os valores menores ou iguais a 5
        filter(value => value <= 5),
        // Multiplica os valores restantes por 10
        map(value => value * 10),
        // Limita a 3 primeiros valores do fluxo
        take(3),
        // Soma os valores ao longo do tempo
        scan((acc, value) => acc + value, 0),
        // Aplica uma ação colateral (log) em cada valor emitido
        tap(value => console.log('Valor atual após scan:', value)),
        // Pega apenas o último valor emitido
        takeLast(1)
      )
      .subscribe(result => console.log('Resultado final:', result));
  }
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
