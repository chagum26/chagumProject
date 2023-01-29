import { MyPokemonData } from './shared/models/pokemonDataCard';
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
  pageNumbers: number[] = [];
  goTo: number = 1;

  constructor(private pokemonService: PokemonsService) {}

  ngOnInit(): void {
    this.updateGoto();
    this.getPokemons(this.paginatorData);
  }

  getPokemons(paginatorData: PageEvent): void {
    this.myPokemons = [];
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
    this.myPokemons.sort((a, b) => a.id - b.id)
  }

  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  onChangePaginatorPokemons($event: PageEvent) {
    this.paginatorData = $event
    this.getPokemons(this.paginatorData);
    this.updateGoto();
  }

  goToChange($event: any) {
    this.goTo = $event.value;
    this.paginatorData.pageIndex = $event.value - 1;
    this.getPokemons(this.paginatorData);
  }

  updateGoto() {
    this.goTo = this.paginatorData.pageIndex + 1;
    this.pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.paginatorData.length / this.paginatorData.pageSize); i++) {
      this.pageNumbers.push(i);
    }
  }
}
