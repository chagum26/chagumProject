import { FichePokemonData } from './../models/fichePokemonData';
import { ColorService } from './../../../../shared/services/color.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyPokemonData } from 'src/app/pokemons/shared/models/myPokemonData';
import { PokemonData } from 'src/app/pokemons/shared/models/pokemonData';

@Injectable({
  providedIn: 'root'
})
export class FichePokemonService {
  constructor() {}
}
