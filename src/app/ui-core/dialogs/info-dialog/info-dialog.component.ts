import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';

@Component({
  selector: 'dialog-info',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent {
  private _title: string;
  public get title(): string { return this._title; }

  private _message: string;
  public get message(): string { return this._message; }

  private _buttonText: string;
  public get buttonText(): string { return this._buttonText; }

  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent, string>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this._title = data.title || null;
    this._message = data.message || null;
    this._buttonText = data.buttonText || 'Ok';
  }

  public done(): void {
    this.dialogRef.close('done');
  }

}
