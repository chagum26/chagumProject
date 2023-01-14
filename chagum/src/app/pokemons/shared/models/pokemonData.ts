import { imagePokemon } from "./forms/imagePokemon";
import { TypesPokemon } from "./types/typesPokemon";

export interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: imagePokemon;
  types: TypesPokemon[];
  /*abilities: Ability[];
  species: Species;
  types: Type[];*/
}
