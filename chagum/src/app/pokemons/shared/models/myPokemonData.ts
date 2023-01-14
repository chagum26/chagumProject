import { imagePokemon } from "./forms/imagePokemon";
import { TypePokemon } from "./types/typePokemon";

export class MyPokemonData {
  id!: number;
  name!: string;
  height!: number;
  weight!: number;
  picturesUrl?: imagePokemon;
  types: TypePokemon[] = [];
}
