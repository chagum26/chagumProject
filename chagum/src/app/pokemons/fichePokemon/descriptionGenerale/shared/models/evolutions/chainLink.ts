import { EvolutionDetails } from "./evolutionDetails";
import { EvolutionSpecies } from "./evolutionSpecies";

export interface ChainLink {
  evolution_details: EvolutionDetails[];
  evolves_to: ChainLink[];
  species: EvolutionSpecies;
}
