import { PokemonAPI } from './../models/pokemonAPI';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PokemonData } from '../models/pokemonData';
import { FormData } from '../models/formData';

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

  getFormsById(id: number): Observable<FormData> {
    return this.http.get<FormData>("https://pokeapi.co/api/v2/pokemon-form/" + id);
  }
}
