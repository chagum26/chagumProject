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

  constructor(
    private http: HttpClient,
    private colorService: ColorService,
    ) {}

  getDataFromPokemonById(id: number): Observable<PokemonData> {
    return this.http.get<PokemonData>("https://pokeapi.co/api/v2/pokemon/" + id);
  }

  convertPokemonsDataToFichePokemonData(pokemonData: PokemonData): MyPokemonData {
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
            type = this.colorService.setColorType(type);
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
