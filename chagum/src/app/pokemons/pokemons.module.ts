import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonsComponent } from './pokemons.component';
import { PokemonsRoutingModule } from './pokemons.routing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    PokemonsRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    FlexLayoutModule,
  ],
  declarations: [PokemonsComponent]
})
export class PokemonsModule { }
