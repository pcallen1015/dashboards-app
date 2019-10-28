import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';
import { View } from '../view';

@Component({
  selector: 'view-edit-dialog',
  templateUrl: './edit-view-dialog.component.html',
  styleUrls: ['./edit-view-dialog.component.css']
})
export class EditViewDialogComponent {
  private _view: View;
  public get view(): View { return this._view; }

  private _isNew: boolean;
  public get isNew(): boolean { return this._isNew; }

  constructor(
    public dialogRef: MatDialogRef<EditViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this._view = data.view || new View();
    this._isNew = data.isNew || false;
    console.debug(data);
  }

  public done(view: View): void {
    this.dialogRef.close(view);
  }

}
