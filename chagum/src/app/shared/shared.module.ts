import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { PrimengModule } from './primeng.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [],
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
  ],
})
export class SharedModule { }
