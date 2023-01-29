import { TypeService } from './shared/services/type.service';
import { Component, Input, OnChanges } from '@angular/core';
import { FichePokemonData } from '../shared/models/fichePokemonData';
import { first } from 'rxjs';
import { PokemonData } from '../../shared/models/pokemonData';
import { DescriptionGeneraleService } from './shared/services/description-generale.service';
import { PokemonSpeciesData } from './shared/models/pokemonSpeciesData';
import { FlavorText } from './shared/models/flavortext/flavorText';
import { TypePokemon } from '../../shared/models/types/typePokemon';
import { PokemonChartData } from './shared/models/pokemonChartData/pokemonChartData';
@Component({
  selector: 'app-descriptionGenerale',
  templateUrl: './descriptionGenerale.component.html',
  styleUrls: ['./descriptionGenerale.component.css']
})
export class DescriptionGeneraleComponent implements OnChanges {
  @Input() pokemonName!: string;
  pokemonData!: PokemonData;
  pokemonSpeciesData?: PokemonSpeciesData;
  myFichePokemonData?: FichePokemonData;

  descriptionPokemon!: string;
  typesFaiblesses?: TypePokemon[];

  statsPokemon = new PokemonChartData();
  isStatsLoaded: boolean = false;

  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
          labels: {
              // This more specific font property overrides the global property
              font: {
                  size: 20,
                  family: "'Roboto', 'Roboto', 'Roboto', sans-serif",
              }
          }
      }
  }
  };

  constructor(
    private descriptionGeneraleService: DescriptionGeneraleService,
    private typeService: TypeService,
  ) {

  }

  ngOnChanges() {
    this.descriptionGeneraleService.getDataFromPokemonByName(this.pokemonName)
      .pipe(first())
      .subscribe((pokemonData) => {
        this.pokemonData = pokemonData;
        this.pokemonData.name = this.capitalizeFirstLetter(this.pokemonData.name);
        this.myFichePokemonData = this.descriptionGeneraleService.convertPokemonsDataToFichePokemonData(pokemonData);

        this.typeService.getTypeDataByTypeId(this.myFichePokemonData.types[0].url)
          .pipe(first())
          .subscribe((typeApiData) => {
            this.typesFaiblesses = this.typeService.convertColorForEachType(typeApiData.damage_relations.double_damage_from);
          });
        this.convertStatsPokemonToChartData(this.myFichePokemonData);

      });

    this.descriptionGeneraleService.getMoreDataFromPokemonByName(this.pokemonName)
      .pipe(first())
      .subscribe((pokemonSpeciesData) => {
        this.pokemonSpeciesData = pokemonSpeciesData;

        this.setDescriptionPokemon(this.pokemonSpeciesData.flavor_text_entries[0]);
      });
  }

  setDescriptionPokemon(flavor_text_entries: FlavorText) {
    this.descriptionPokemon = flavor_text_entries.flavor_text;
  }

  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  convertStatsPokemonToChartData(myFichePokemonData: FichePokemonData) {
    myFichePokemonData.stats.forEach((stat) => {
      this.statsPokemon.labels.push(stat.stat.name);
      this.statsPokemon.datasets[0].data.push(stat.base_stat);
      this.isStatsLoaded = true;
    });
  }
}
