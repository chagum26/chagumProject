import { Pokemon } from './pokemon';
export interface PokemonAPI {
  count: number;
  next: string;
  results: Pokemon[];
}
