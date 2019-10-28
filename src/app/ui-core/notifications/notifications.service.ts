import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

@Injectable()
export class NotificationsService {

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  public simpleSnackBar(message: string, actionLabel: string = '', duration: number = 3000): MatSnackBarRef<SimpleSnackBar> {
    let ref: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open(message, actionLabel, { duration: duration });
    return ref;
  }

}
