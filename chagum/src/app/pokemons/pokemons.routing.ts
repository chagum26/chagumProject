import { PokemonsComponent } from './pokemons.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: PokemonsComponent
  }
];

export const PokemonsRoutes = RouterModule.forChild(routes);

@NgModule({
  imports: [PokemonsRoutes],
  exports: [RouterModule]
})

export class PokemonsRoutingModule { }
