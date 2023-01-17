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
  paginatorData: PageEvent = {
    previousPageIndex: 0,
    pageIndex: 0,
    pageSize: 20,
    length: 1279,
  };
  pokemonData!: PokemonData;
  pokemonName!: string;
  myFichePokemonData?: FichePokemonData;

  constructor(
    private route: ActivatedRoute,
    private fichePokemonService: FichePokemonService,
    ) { }

  ngOnInit() {
    this.pokemonName = this.route.snapshot.paramMap.get('name')!;
    this.fichePokemonService.getDataFromPokemonByName(this.pokemonName)
      .pipe(first())
      .subscribe((pokemonData) => {
        this.pokemonData = pokemonData;
        this.myFichePokemonData = this.fichePokemonService.convertPokemonsDataToFichePokemonData(pokemonData);
      });
  }

}
