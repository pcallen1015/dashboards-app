import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentModule } from './content/content.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PresentationsModule } from './presentations/presentations.module';
import { UtilsModule } from './utils/utils.module';

@NgModule({
  imports: [
    CommonModule,

    ContentModule.forRoot(),
    DialogsModule,
    NotificationsModule,
    PresentationsModule.forRoot(),
    UtilsModule
  ],
  exports: [
    ContentModule,
    DialogsModule,
    NotificationsModule,
    PresentationsModule,
    UtilsModule
  ]
})
export class UiCoreModule {}
