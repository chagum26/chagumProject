import { CartePokemonComponent } from './../pokemons/shared/carte-pokemon/carte-pokemon.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { PrimengModule } from './primeng.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [CartePokemonComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    PrimengModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
  ],
  exports: [
    RouterModule,
    CommonModule,
    PrimengModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    CartePokemonComponent,
  ],
})
export class SharedModule { }
