import { imagePokemon } from "src/app/pokemons/shared/models/forms/imagePokemon";
import { Stats } from "src/app/pokemons/shared/models/stats/stats";
import { TypePokemon } from "src/app/pokemons/shared/models/types/typePokemon";

export class FichePokemonData {
  id!: number;
  name!: string;
  height!: number;
  weight!: number;
  picturesUrl?: imagePokemon;
  types: TypePokemon[] = [];
  stats!: Stats[];
}

