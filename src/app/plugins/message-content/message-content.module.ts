import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCoreModule } from '../../ui-core/ui-core.module';
import { MessageContentComponent } from './message-content.component';

@NgModule({
  imports: [
    CommonModule,
    UiCoreModule
  ],
  declarations: [
    MessageContentComponent,
  ],
  entryComponents: [
    MessageContentComponent,
  ],
  exports: [
    MessageContentComponent,
  ]
})
export class MessageContentModule { }
