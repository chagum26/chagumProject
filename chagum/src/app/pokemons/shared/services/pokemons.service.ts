import { PageEvent } from '@angular/material/paginator';
import { TypesPokemon } from './../models/types/typesPokemon';
import { PokemonAPI } from './../models/pokemonAPI';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PokemonData } from '../models/pokemonData';
import { ColorService } from 'src/app/shared/services/color.service';

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

  setColorTypes(pokemonData: PokemonData): PokemonData{
    pokemonData.types
      .map((type) => {
        type = this.colorService.setColorType(type);
      });
    return pokemonData;
  }


}
