import { MyPokemonData } from './shared/models/myPokemonData';
import { PokemonsService } from './shared/services/pokemons.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Pokemon } from './shared/models/pokemon';
import { PokemonAPI } from './shared/models/pokemonAPI';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  PokeAPI!: PokemonAPI;
  listPokemon: Pokemon[] = [];
  myPokemons: MyPokemonData[] = [];

  constructor(private pokemonService: PokemonsService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemonAPI()
    .pipe(first())
    .subscribe((pokemonsApi) => {
      this.PokeAPI = pokemonsApi;

      this.PokeAPI.results.map((pokemon) => {
        this.pokemonService.getDataFromPokemon(pokemon.url)
        .pipe(first())
        .subscribe((pokemonData) => {
          pokemon.pokeData = pokemonData;
          this.getPokemonsDataFromAPI(pokemon);
        });
      });
    });
  }

  getPokemonsDataFromAPI(pokemonFromAPI: Pokemon) {
    pokemonFromAPI.name = this.capitalizeFirstLetter(pokemonFromAPI.name);
    this.myPokemons.push(this.pokemonService.convertPokemonsDataToMyPokemons(pokemonFromAPI.pokeData));
  }

  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
