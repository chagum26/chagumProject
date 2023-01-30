import { PageModule } from './../page/page.module';
import { PokemonsRoutes } from './pokemons.routing';
import { NgModule } from '@angular/core';
import { PokemonsComponent } from './pokemons.component';
import { SharedModule } from '../shared/shared.module';
import { CartePokemonComponent } from './shared/carte-pokemon/carte-pokemon.component';

@NgModule({
  imports: [
    PokemonsRoutes,
    SharedModule,
    PageModule,
  ],
  declarations: [PokemonsComponent]
})
export class PokemonsModule { }
