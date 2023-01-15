import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { PrimengModule } from './primeng.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    PrimengModule,
    FlexLayoutModule,
    FormsModule,
  ],
  exports: [
    RouterModule,
    CommonModule,
    PrimengModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ],
})
export class SharedModule { }
