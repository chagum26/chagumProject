import { MyPokemonAutocompleteData } from './../../pokemons/shared/models/myPokemonAutocompleteData';
import { PokemonsService } from './../../pokemons/shared/services/pokemons.service';
import { Pokemon } from './../../pokemons/shared/models/pokemon';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { first, map, Observable, startWith } from 'rxjs';
import { PokemonAPI } from 'src/app/pokemons/shared/models/pokemonAPI';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  myControl = new FormControl<string | MyPokemonAutocompleteData[]>('');
  filteredOptions!: Observable<MyPokemonAutocompleteData[]>;
  options: MyPokemonAutocompleteData[] = [];
  PokeAPI!: PokemonAPI;


  constructor(private pokemonService: PokemonsService) { }

  ngOnInit() {
    this.getPokemons();

  }

  getPokemons(): void {
    this.pokemonService.getAllPokemonAPI()
    .pipe(first())
    .subscribe((pokemonsApi) => {
      this.PokeAPI = pokemonsApi;

      this.PokeAPI.results.map((pokemon) => {
        this.pokemonService.getDataAutoCompleteFromPokemon(pokemon.url)
        .pipe(first())
        .subscribe((pokemonData) => {
          this.options.push(pokemonData);
        });
      });
    });
  }

  displayFn(pokemon: Pokemon): string {
    return pokemon && pokemon.name ? pokemon.name : '';
  }

  private _filter(name: string): MyPokemonAutocompleteData[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
