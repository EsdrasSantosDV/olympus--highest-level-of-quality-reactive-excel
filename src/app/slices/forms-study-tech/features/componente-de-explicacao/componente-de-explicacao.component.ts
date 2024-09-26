import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from '../../../../shared/ui/chips/chips.component';
import {
  ChipsControlValueAccessorComponent,
} from '../../../../shared/ui/chips-control-value-accessor/chips-control-value-accessor.component';
import {
  MyTreeItemBase,
  SelectTreeValueAccessorComponent,
} from '../../../../shared/ui/select-tree-value-accessor/select-tree-value-accessor.component';
import { StateNation, StateService } from '../../../../core/services/states.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-componente-de-explicacao',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
    MatChipsModule,
    ChipsComponent,
    ChipsControlValueAccessorComponent,
    SelectTreeValueAccessorComponent,
  ],
  templateUrl: './componente-de-explicacao.component.html',
  styleUrl: './componente-de-explicacao.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponenteDeExplicacaoComponent {

  formBuilder = inject(FormBuilder);
  stateService = inject(StateService);

  //REACTIVE
  form = this.formBuilder.group({
    states: this.formBuilder.control<StateNation[]>([]),
  });

  states$ = this.stateService.getStateNation().pipe(
    map((states) => this.convertToStateNationTree(states)),
  );


  convertToStateNationTree(items: StateNation[]): MyTreeItemBase<StateNation>[] {
    const regionsMap: { [key: string]: MyTreeItemBase<StateNation> } = {};
    items.forEach((state) => {
      const regionName = state.region.nome;
      if (!regionsMap[regionName]) {
        regionsMap[regionName] = {
          display: regionName,
          expanded: signal(false),
          children: [],
          key: '',
          id: state.id,
        };
      }
      regionsMap[regionName].children!.push(state);
    });
    return Object.values(regionsMap);
  }

}



