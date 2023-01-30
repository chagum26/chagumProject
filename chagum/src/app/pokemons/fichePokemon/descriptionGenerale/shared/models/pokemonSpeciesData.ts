import { Color } from "./color/color";
import { FlavorText } from "./flavortext/flavorText";
import { Habitat } from "./habitat/habitat";

export interface PokemonSpeciesData {
  flavor_text_entries: FlavorText[];
  habitat: Habitat;
  color: Color;
  evolution_chain: { url: string };
}
