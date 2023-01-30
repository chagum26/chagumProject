import { imagePokemon } from "./forms/imagePokemon";
import { Stats } from "./stats/stats";
import { TypesPokemon } from "./types/typesPokemon";

export interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: imagePokemon;
  types: TypesPokemon[];
  stats: Stats[];
}
