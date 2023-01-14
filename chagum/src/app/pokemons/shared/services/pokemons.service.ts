import { PokemonAPI } from './../models/pokemonAPI';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PokemonData } from '../models/pokemonData';
import { MyPokemonData } from '../models/myPokemonData';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private host = environment.pokeAPI;
  listPokemon: any;

  constructor(private http: HttpClient) {}

  getPokemonAPI(): Observable<PokemonAPI> {
    return this.http.get<PokemonAPI>(this.host + '/pokemon');
  }

  getDataFromPokemon(url: string): Observable<PokemonData> {
    return this.http.get<PokemonData>(url);
  }

  convertPokemonsDataToMyPokemons(pokemonData: PokemonData): MyPokemonData {
    let myPokemon = new MyPokemonData();
    for(const property in pokemonData) {
      switch(property) {
        case 'id':
          myPokemon.id = pokemonData.id;
          break;
        case 'name':
          myPokemon.name = pokemonData.name;
          break;
        case 'height':
          myPokemon.height = pokemonData.height;
          break;
        case 'weight':
          myPokemon.weight = pokemonData.weight;
          break;
        case 'sprites':
          myPokemon.picturesUrl = pokemonData.sprites;
          break;
        case 'types':
          pokemonData.types
          .map((type) => {
            myPokemon.types.push(type.type);
          });
          break;
        default:
          break;
      }
    }
    return myPokemon;
  }
}
