import { PageEvent } from '@angular/material/paginator';
import { TypesPokemon } from './../models/types/typesPokemon';
import { PokemonAPI } from './../models/pokemonAPI';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PokemonData } from '../models/pokemonData';
import { MyPokemonData } from '../models/myPokemonData';
import { ColorService } from 'src/app/shared/services/color.service';
import { MyPokemonAutocompleteData } from '../models/myPokemonAutocompleteData';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  private host = environment.pokeAPI;
  listPokemon: any;

  constructor(
    private http: HttpClient,
    private colorService: ColorService,
    ) {}

  getPokemonAPI(paginatorData: PageEvent): Observable<PokemonAPI> {
    let offset = paginatorData.pageIndex * paginatorData.pageSize;
    return this.http.get<PokemonAPI>(this.host + '/pokemon?offset='+ offset +'&limit=' + paginatorData.pageSize);
  }

  getAllPokemonAPI(): Observable<PokemonAPI> {
    return this.http.get<PokemonAPI>(this.host + '/pokemon?limit=' + 1279);
  }

  getDataFromPokemon(url: string): Observable<PokemonData> {
    return this.http.get<PokemonData>(url);
  }

  getDataAutoCompleteFromPokemon(url: string): Observable<MyPokemonAutocompleteData> {
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
