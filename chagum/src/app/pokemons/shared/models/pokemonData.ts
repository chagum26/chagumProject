import { imagePokemon } from "./imagePokemon";

export interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: imagePokemon;
  /*abilities: Ability[];
  species: Species;
  types: Type[];*/
}
