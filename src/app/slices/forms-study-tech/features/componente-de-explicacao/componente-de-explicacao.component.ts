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
import { PokemonService } from '../../../../core/services/pokemon.service';

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
  ],
  templateUrl: './componente-de-explicacao.component.html',
  styleUrl: './componente-de-explicacao.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponenteDeExplicacaoComponent {
  formBuilder = inject(FormBuilder);
  pokemonService = inject(PokemonService);

  //REACTIVE
  form = this.formBuilder.group({
    pokemons: this.formBuilder.control([]),
  });

  pokemons$ = this.pokemonService.getPokemons();

  //TEMPLATE
  pokemonsTemplateDriven = signal([]);

}
