import { NgModule } from '@angular/core';
import { PageComponent } from './page.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [HeaderComponent],
  declarations: [PageComponent, HeaderComponent]
})
export class PageModule {}
