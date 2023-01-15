import { MyPokemonData } from './shared/models/myPokemonData';
import { PokemonsService } from './shared/services/pokemons.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Pokemon } from './shared/models/pokemon';
import { PokemonAPI } from './shared/models/pokemonAPI';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  PokeAPI!: PokemonAPI;
  myPokemons: MyPokemonData[] = [];
  paginatorData: PageEvent = {
    previousPageIndex: 0,
    pageIndex: 0,
    pageSize: 20,
    length: 1279,
  };

  constructor(private pokemonService: PokemonsService) {}

  ngOnInit(): void {
    this.getPokemons(this.paginatorData);
  }

  getPokemons(paginatorData: PageEvent): void {
    this.pokemonService.getPokemonAPI(paginatorData)
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
    pokemonFromAPI.pokeData.name = this.capitalizeFirstLetter(pokemonFromAPI.pokeData.name);
    this.myPokemons.push(this.pokemonService.convertPokemonsDataToMyPokemons(pokemonFromAPI.pokeData));
  }

  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  onChangePaginatorPokemons($event: PageEvent) {
    console.log($event);
    this.paginatorData = $event
    this.myPokemons = [];
    this.getPokemons(this.paginatorData);
  }
}
