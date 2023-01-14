import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichePokemonComponent } from './fichePokemon.component';
import { FichePokemonRoutes } from './fichePokemon.routing';

@NgModule({
  imports: [
    CommonModule,
    FichePokemonRoutes
  ],
  declarations: [FichePokemonComponent]
})
export class FichePokemonModule { }
