import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogsService } from './dialogs.service';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    InfoDialogComponent,
    ConfirmationDialogComponent,
  ],
  entryComponents: [
    InfoDialogComponent,
    ConfirmationDialogComponent,
  ],
  providers: [
    DialogsService,
  ]
})
export class DialogsModule { }
