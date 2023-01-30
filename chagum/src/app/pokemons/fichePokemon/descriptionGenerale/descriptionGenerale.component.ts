import { PokemonsService } from './../../shared/services/pokemons.service';
import { ChainLink } from './shared/models/evolutions/chainLink';
import { EvolutionChain } from './shared/models/evolutions/evolutionChain';
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

  evolutionChainData?: EvolutionChain;
  evolutionStep1: PokemonData[] = [];
  evolutionStep2: PokemonData[] = [];
  evolutionStep3: PokemonData[] = [];

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
    private pokemonService: PokemonsService,
    private typeService: TypeService,
  ) {

  }

  ngOnChanges() {
    //données depuis endpoint "https://pokeapi.co/api/v2/pokemon/:name"
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

    //données depuis endpoint "https://pokeapi.co/api/v2/pokemon-species/:name"
    this.descriptionGeneraleService.getMoreDataFromPokemonByName(this.pokemonName)
      .pipe(first())
      .subscribe((pokemonSpeciesData) => {
        this.pokemonSpeciesData = pokemonSpeciesData;

        this.setDescriptionPokemon(this.pokemonSpeciesData.flavor_text_entries[0]);

        this.descriptionGeneraleService.getEvolutionChain(this.pokemonSpeciesData.evolution_chain.url)
          .pipe(first())
          .subscribe((evolutionStarter) => {
            this.evolutionChainData = evolutionStarter;
            this.descriptionGeneraleService.getDataFromPokemonByName(this.evolutionChainData.chain.species.name)
              .pipe(first())
              .subscribe((evolutionStep1) => this.evolutionStep1.push(this.setAllDataPokemonData(evolutionStep1)));
            this.evolutionChainData.chain.evolves_to.map((evolvesFromStep1To2) => {
              this.descriptionGeneraleService.getDataFromPokemonByName(evolvesFromStep1To2.species.name)
                .pipe(first())
                .subscribe((evolutionStep2) => {
                this.evolutionStep2.push(this.setAllDataPokemonData(evolutionStep2));
                evolvesFromStep1To2.evolves_to?.map((evolvesFromStep2To3) => {

                  this.descriptionGeneraleService.getDataFromPokemonByName(evolvesFromStep2To3.species.name)
                    .pipe(first())
                    .subscribe((evolutionStep3) => {
                    this.evolutionStep3.push(this.setAllDataPokemonData(evolutionStep3));
                  });
                });
              });
            });
          });
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

  setAllDataPokemonData(pokemonData: PokemonData): PokemonData {
    pokemonData.name = this.capitalizeFirstLetter(pokemonData.name);
    pokemonData = this.pokemonService.setColorTypes(pokemonData);
    return pokemonData;
  }
}
