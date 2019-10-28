import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarwarsContentModule } from './starwars-content/starwars-content.module';
import { MessageContentModule } from './message-content/message-content.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StarwarsContentModule,
    MessageContentModule
  ],
  exports: [
    StarwarsContentModule,
    MessageContentModule
  ]
})
export class PluginsModule { }
