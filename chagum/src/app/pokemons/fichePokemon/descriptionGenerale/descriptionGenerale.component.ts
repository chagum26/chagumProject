
import { Component, Input, OnChanges } from '@angular/core';
import { FichePokemonData } from '../shared/models/fichePokemonData';
import { first } from 'rxjs';
import { PokemonData } from '../../shared/models/pokemonData';
import { DescriptionGeneraleService } from './shared/services/description-generale.service';
import { PokemonSpeciesData } from './shared/models/pokemonSpeciesData';
import { FlavorText } from './shared/models/flavortext/flavorText';

@Component({
  selector: 'app-descriptionGenerale',
  templateUrl: './descriptionGenerale.component.html',
  styleUrls: ['./descriptionGenerale.component.css']
})
export class DescriptionGeneraleComponent implements OnChanges {
  @Input() pokemonName!: string;
  pokemonData!: PokemonData;
  pokemonSpeciesData!: PokemonSpeciesData;
  myFichePokemonData?: FichePokemonData;

  descriptionPokemon!: string;

  constructor(
    private descriptionGeneraleService: DescriptionGeneraleService,
  ) { }

  ngOnChanges() {
    this.descriptionGeneraleService.getDataFromPokemonByName(this.pokemonName)
      .pipe(first())
      .subscribe((pokemonData) => {
        this.pokemonData = pokemonData;
        this.pokemonData.name = this.capitalizeFirstLetter(this.pokemonData.name);
        this.myFichePokemonData = this.descriptionGeneraleService.convertPokemonsDataToFichePokemonData(pokemonData);
      });

    this.descriptionGeneraleService.getMoreDataFromPokemonByName(this.pokemonName)
      .pipe(first())
      .subscribe((pokemonSpeciesData) => {
        this.pokemonSpeciesData = pokemonSpeciesData;

        this.setDescriptionPokemon(this.pokemonSpeciesData.flavor_text_entries[0]);
      });
  }

  setDescriptionPokemon(flavor_text_entries: FlavorText) {
    console.log(flavor_text_entries);
    this.descriptionPokemon = flavor_text_entries.flavor_text;
  }

  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
