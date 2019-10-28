import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogRef } from './confirmation-dialog/confirmation-dialog-ref';
import { InfoDialogRef } from './info-dialog/info-dialog-ref';

@Injectable()
export class DialogsService {

  constructor(
    private _dialog: MatDialog,
  ) { }

  public info(title: string, message: string, buttonText: string = 'Ok'): InfoDialogRef {
    return new InfoDialogRef(
      this._dialog.open(InfoDialogComponent, {
        width: '500px',
        data: {
          title: title,
          message: message,
          buttonText: buttonText
        }
      })
    );
  }

  public confirm(prompt: string = 'Are you sure?', confirmText: string = 'Confirm', rejectText: string = 'Reject'): ConfirmationDialogRef {
    return new ConfirmationDialogRef(
      this._dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: {
          prompt: prompt,
          confirmText: confirmText,
          rejectText: rejectText
        }
      })
    );
  }

  public form() {

  }

}
