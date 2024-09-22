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
    return this.http.get<{ results: Pokemon[] }>(this.initialUrl).pipe(
      map((value) => value.results),
      shareReplay(1),
    );
  }
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}
