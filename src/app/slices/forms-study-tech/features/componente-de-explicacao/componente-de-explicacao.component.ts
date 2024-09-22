import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
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
import { toSignal } from '@angular/core/rxjs-interop';
import { Pokemon } from '../../../../shared/types/interfaces/pokemon';

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
export class ComponenteDeExplicacaoComponent implements OnInit {

  formBuilder = inject(FormBuilder);
  pokemonService = inject(PokemonService);

  //REACTIVE
  form = this.formBuilder.group({
    pokemons: this.formBuilder.control<Pokemon[]>([]),
  });

  pokemons$ = this.pokemonService.getPokemons();
  pokemonsSIG = toSignal(this.pokemons$, { initialValue: [] });
  pokemonsTemplateDriven = signal<Pokemon[]>(this.pokemonsSIG());

  constructor() {
    effect(() => {
      if (this.pokemonsSIG().length > 0) {
        const pokemon = this.pokemonsSIG()[0];
        this.form.get('pokemons')?.setValue([pokemon]);
        this.pokemonsTemplateDriven.set([pokemon]);
      }
    }, {
      allowSignalWrites: true,
    });
  }

  ngOnInit(): void {

    this.form.disable();
  }

}
