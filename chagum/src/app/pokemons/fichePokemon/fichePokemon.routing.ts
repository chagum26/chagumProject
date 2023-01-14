import { FichePokemonComponent } from './fichePokemon.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FichePokemonComponent,
  },
];

export const FichePokemonRoutes = RouterModule.forChild(routes);
