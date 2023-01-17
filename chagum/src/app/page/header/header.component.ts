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
  myControl = new FormControl<string | Pokemon>('');
  filteredOptions!: Observable<Pokemon[]>;
  options: Pokemon[] = [];
  PokeAPI!: PokemonAPI;


  constructor(private pokemonService: PokemonsService) { }

  ngOnInit() {
    this.getPokemons();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  getPokemons(): void {
    this.pokemonService.getAllPokemonAPI()
    .pipe(first())
    .subscribe((pokemonsApi) => {
      this.options = pokemonsApi.results
    });
  }

  displayFn(pokemon: Pokemon): string {
    return pokemon && pokemon.name ? pokemon.name : '';
  }

  private _filter(name: string): Pokemon[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
