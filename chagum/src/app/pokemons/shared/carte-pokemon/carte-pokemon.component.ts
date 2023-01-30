import { Component, Input } from '@angular/core';
import { MyPokemonData } from '../models/pokemonDataCard';

@Component({
  selector: 'app-carte-pokemon',
  templateUrl: './carte-pokemon.component.html',
  styleUrls: ['./carte-pokemon.component.css']
})
export class CartePokemonComponent {
  @Input() myPokemon!: MyPokemonData;

}
