import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentModule } from './content/content.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { GravityModule } from './gravity/gravity.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PresentationsModule } from './presentations/presentations.module';
import { UtilsModule } from './utils/utils.module';

@NgModule({
  imports: [
    CommonModule,

    ContentModule.forRoot(),
    DialogsModule,
    GravityModule,
    NotificationsModule,
    PresentationsModule.forRoot(),
    UtilsModule
  ],
  exports: [
    ContentModule,
    DialogsModule,
    GravityModule,
    NotificationsModule,
    PresentationsModule,
    UtilsModule
  ]
})
export class UiCoreModule {}
