import { CartePokemonComponent } from './../shared/carte-pokemon/carte-pokemon.component';
import { DescriptionGeneraleComponent } from './descriptionGenerale/descriptionGenerale.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichePokemonComponent } from './fichePokemon.component';
import { FichePokemonRoutes } from './fichePokemon.routing';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    FichePokemonRoutes,
    SharedModule,
  ],
  declarations: [FichePokemonComponent, DescriptionGeneraleComponent]
})
export class FichePokemonModule { }
