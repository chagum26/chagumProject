import { PokemonsService } from './shared/services/pokemons.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Pokemon } from './shared/models/pokemon';
import { PokemonData } from './shared/models/pokemonData';
import { PokemonAPI } from './shared/models/pokemonAPI';
import { FormData } from './shared/models/formData';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  PokeAPI!: PokemonAPI;
  listPokemon: Pokemon[] = [];
  pokeForms: FormData[] = [];

  constructor(private pokemonService: PokemonsService) {}

  ngOnInit(): void {
    this.getPokemons();
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
          pokemon.name = this.capitalizeFirstLetter(pokemon.name);

          this.pokemonService.getFormsById(pokemon.pokeData.id)
          .pipe(first())
          .subscribe((formData) => {
            pokemon.pokeData.sprites = formData.sprites;
            this.listPokemon.push(pokemon);
            console.log(pokemon.pokeData.sprites.back_default);
          })
        });
      });
    });
  }

  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
