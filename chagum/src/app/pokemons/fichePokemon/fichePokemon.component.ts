import { PokemonsService } from './../shared/services/pokemons.service';
import { FichePokemonService } from './shared/services/fiche-pokemon.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { PokemonData } from '../shared/models/pokemonData';
import { FichePokemonData } from './shared/models/fichePokemonData';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-fichePokemon',
  templateUrl: './fichePokemon.component.html',
  styleUrls: ['./fichePokemon.component.css']
})
export class FichePokemonComponent implements OnInit {
  pokemonName!: string;

  constructor(
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.pokemonName = params['name'];
    });
  }

}
