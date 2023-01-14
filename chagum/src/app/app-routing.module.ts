import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  {path: '', redirectTo: 'pokemons', pathMatch: 'full'},
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: 'pokemons',
        loadChildren: () =>
          import('./pokemons/pokemons.module').then(m => m.PokemonsModule),
      }
    ],
  },
  {path: '**', redirectTo: 'pokemons', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      scrollPositionRestoration: 'top',
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
