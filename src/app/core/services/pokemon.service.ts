import { inject, Injectable } from '@angular/core';
import { Pokemon } from '../../shared/types/interfaces/pokemon';
import { map, Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  http = inject(HttpClient);
  private initialUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1000';

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<PokemonResponse>(this.initialUrl).pipe(
      map(response => response.results),
      shareReplay(1),
    );
  }

  //DUPLICAR OS POKEMONS

  private generatePokemonDuplicates(pokemons: Pokemon[]): Pokemon[] {
    let id = 1;
    const duplicatedPokemons: Pokemon[] = [];

    pokemons.forEach(pokemon => {
      for (let i = 1; i <= 8; i++) {
        duplicatedPokemons.push({
          id: id++,
          name: `${pokemon.name}${i}`,
          url: pokemon.url,
        });
      }
    });
    // Ordenando os pokémons duplicados pelo nome
    duplicatedPokemons.sort((a, b) => a.name.localeCompare(b.name));

    return duplicatedPokemons;
  }
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}
