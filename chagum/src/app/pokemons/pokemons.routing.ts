import { FichePokemonComponent } from './fichePokemon/fichePokemon.component';
import { PokemonsComponent } from './pokemons.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PokemonsComponent,
    pathMatch:'full',
  },
  {
    path: 'pokemon/:name',
    component: FichePokemonComponent,
    loadChildren: () =>
      import('./fichePokemon/fichePokemon.module').then((m) => m.FichePokemonModule),
    pathMatch:'full',
  }
];

export const PokemonsRoutes = RouterModule.forChild(routes);
