import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dragon-ball',
  standalone: true,
  imports: [],
  templateUrl: './dragon-ball.component.html',
  styleUrl: './dragon-ball.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragonBallComponent {

}
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { debounceTime, filter, startWith, switchMap, map } from 'rxjs/operators';


@Component({
  selector: 'app-dragonball-search',
  templateUrl: './dragonball-search.component.html',
  styleUrls: ['./dragonball-search.component.scss'],
})
export class DragonBallSearchComponent implements OnInit {
 



  searchTerm$ = this.searchField.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    filter(term => term.length >= 2)  // Só pesquisa termos com mais de 1 caractere
  );
  // Fluxo de seleção de categoria (Herói ou Vilão)
  categoryTerm$ = this.categoryField.valueChanges.pipe(
    startWith('')
  );
  // Combinando múltiplos fluxos
  filteredCharacters$ = combineLatest(this.searchTerm$,this.categoryTerm$).pipe(
    switchMap(([searchTerm, categoryTerm]) =>
      this.characterService.searchCharacters(searchTerm).pipe(
        // Filtrando o resultado final com base na categoria
        map(characters =>
          characters.filter(character =>
            categoryTerm === '' || character.category.toLowerCase() === categoryTerm.toLowerCase()
          )
        )
      )
    )
  );




  constructor(private characterService: CharacterService) {
    this.searchField = new FormControl('');
    this.categoryField = new FormControl(''); // Campo para filtrar por herói ou vilão
  }

  ngOnInit() {
    // Fluxo de pesquisa de personagens baseado no input de texto

  }
}
