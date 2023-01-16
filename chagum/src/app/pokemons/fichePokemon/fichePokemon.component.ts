import { PokemonsService } from './../shared/services/pokemons.service';
import { FichePokemonService } from './shared/services/fiche-pokemon.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { PokemonData } from '../shared/models/pokemonData';
import { FichePokemonData } from './shared/models/fichePokemonData';

@Component({
  selector: 'app-fichePokemon',
  templateUrl: './fichePokemon.component.html',
  styleUrls: ['./fichePokemon.component.css']
})
export class FichePokemonComponent implements OnInit {
  pokemonData!: PokemonData;
  pokemonId!: string;
  myFichePokemonData?: FichePokemonData;
  constructor(
    private route: ActivatedRoute,
    private fichePokemonService: FichePokemonService,
    ) { }

  ngOnInit() {
    this.pokemonId = this.route.snapshot.paramMap.get('id')!;
    this.fichePokemonService.getDataFromPokemonById(Number(this.pokemonId))
      .pipe(first())
      .subscribe((pokemonData) => {
        this.pokemonData = pokemonData;
        this.myFichePokemonData = this.fichePokemonService.convertPokemonsDataToFichePokemonData(pokemonData);
      });
  }

}
