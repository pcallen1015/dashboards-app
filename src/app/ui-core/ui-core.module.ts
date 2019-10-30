import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { ContentModule } from './content/content.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PresentationsModule } from './presentations/presentations.module';
import { UtilsModule } from './utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,

    ContentModule.forRoot(),
    DialogsModule,
    NotificationsModule,
    PresentationsModule.forRoot(),
    UtilsModule
  ],
  exports: [
    MatButtonModule,
    
    ContentModule,
    DialogsModule,
    NotificationsModule,
    PresentationsModule,
    UtilsModule
  ]
})
export class UiCoreModule {}
