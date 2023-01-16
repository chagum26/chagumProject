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
  declarations: [FichePokemonComponent]
})
export class FichePokemonModule { }
