import { TypePokemon } from 'src/app/pokemons/shared/models/types/typePokemon';

export interface DamageRelations {
  double_damage_from: TypePokemon[];
  double_damage_to: TypePokemon[];
  half_damage_from: TypePokemon[];
  half_damage_to: TypePokemon[];
  no_damage_from: TypePokemon[];
  no_damage_to: TypePokemon[];
}
