import { PageEvent } from '@angular/material/paginator';
import { TypesPokemon } from './../models/types/typesPokemon';
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
  colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };
  private host = environment.pokeAPI;
  listPokemon: any;

  constructor(private http: HttpClient) {}

  getPokemonAPI(paginatorData: PageEvent): Observable<PokemonAPI> {
    let offset = paginatorData.pageIndex * paginatorData.pageSize;
    return this.http.get<PokemonAPI>(this.host + '/pokemon?offset='+ offset +'&limit=' + paginatorData.pageSize);
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
            type = this.setColorType(type);
            myPokemon.types.push(type.type);
          });
          break;
        default:
          break;
      }
    }
    return myPokemon;
  }

  setColorType(type: TypesPokemon): TypesPokemon {
    switch(type.type.name){
      case 'normal':
        type.type.color = this.colours.normal;
        break;
      case 'fire':
        type.type.color = this.colours.fire;
        break;
      case 'water':
        type.type.color = this.colours.water;
        break;
      case 'electric':
        type.type.color = this.colours.electric;
        break;
      case 'grass':
        type.type.color = this.colours.grass;
        break;
      case 'ice':
        type.type.color = this.colours.ice;
        break;
      case 'fighting':
        type.type.color = this.colours.fighting;
        break;
      case 'poison':
        type.type.color = this.colours.poison;
        break;
      case 'ground':
        type.type.color = this.colours.ground;
        break;
      case 'flying':
        type.type.color = this.colours.flying;
        break;
      case 'psychic':
        type.type.color = this.colours.psychic;
        break;
      case 'bug':
        type.type.color = this.colours.bug;
        break;
      case 'rock':
        type.type.color = this.colours.rock;
        break;
      case 'ghost':
        type.type.color = this.colours.ghost;
        break;
      case 'dragon':
        type.type.color = this.colours.dragon;
        break;
      case 'dark':
        type.type.color = this.colours.dark;
        break;
      case 'steel':
        type.type.color = this.colours.steel;
        break;
      case 'fairy':
        type.type.color = this.colours.fairy;
        break;
      default:
        break;
    }
    return type;
  }
}
