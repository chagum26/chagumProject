import { PageModule } from './../page/page.module';
import { PokemonsRoutes } from './pokemons.routing';
import { NgModule } from '@angular/core';
import { PokemonsComponent } from './pokemons.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    PokemonsRoutes,
    SharedModule,
    PageModule,
  ],
  declarations: [PokemonsComponent]
})
export class PokemonsModule { }
