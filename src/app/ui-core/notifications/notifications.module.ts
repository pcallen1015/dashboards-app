import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSnackBarModule } from '@angular/material';


import { NotificationsService } from './notifications.service';

@NgModule({
  imports: [
    CommonModule,

    MatSnackBarModule,
  ],
  providers: [NotificationsService]
})
export class NotificationsModule { }
