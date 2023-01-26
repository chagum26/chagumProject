import { DescriptionGeneraleService } from './services/description-generale.service';
import { Component, Input, OnChanges } from '@angular/core';
import { FichePokemonData } from '../shared/models/fichePokemonData';
import { first } from 'rxjs';
import { PokemonData } from '../../shared/models/pokemonData';

@Component({
  selector: 'app-descriptionGenerale',
  templateUrl: './descriptionGenerale.component.html',
  styleUrls: ['./descriptionGenerale.component.css']
})
export class DescriptionGeneraleComponent implements OnChanges {
  @Input() pokemonName!: string;
  pokemonData!: PokemonData;
  myFichePokemonData?: FichePokemonData;
  constructor(
    private descriptionGeneraleService: DescriptionGeneraleService,
  ) { }

  ngOnChanges() {
    this.descriptionGeneraleService.getDataFromPokemonByName(this.pokemonName)
      .pipe(first())
      .subscribe((pokemonData) => {
        this.pokemonData = pokemonData;
        this.myFichePokemonData = this.descriptionGeneraleService.convertPokemonsDataToFichePokemonData(pokemonData);
      });
  }

}
