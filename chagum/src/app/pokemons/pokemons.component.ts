import { PokemonsService } from './shared/services/pokemons.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Pokemon } from './shared/models/pokemon';
import { PokemonData } from './shared/models/pokemonData';
import { PokemonAPI } from './shared/models/pokemonAPI';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  PokeAPI!: PokemonAPI;
  listPokemon: Pokemon[] = [];
  titre = "CHAGUM LPB";
  constructor(private pokemonService: PokemonsService) {}

  ngOnInit(): void {
    this.getPokemons();
    console.log(this.listPokemon)
  }

  getPokemons(): void {
    this.pokemonService.getPokemonAPI()
    .pipe(first())
    .subscribe((pokemonApi) => {
      this.PokeAPI = pokemonApi;
      this.PokeAPI.results.map((pokemon) => {
        this.pokemonService.getDataFromPokemon(pokemon.url)
        .pipe(first())
        .subscribe((data) => {
          pokemon.pokeData = data;
          this.listPokemon.push(pokemon);
        });
      });
    });
  }
}
