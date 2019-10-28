import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarwarsContentModule } from './starwars-content/starwars-content.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StarwarsContentModule
  ],
  exports: [
    StarwarsContentModule
  ]
})
export class PluginsModule { }
