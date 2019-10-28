import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';

@Component({
  selector: 'dialog-confirmation',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  private _title: string;
  public get title(): string { return this._title; }

  private _prompt: string;
  public get prompt(): string { return this._prompt }

  private _confirmText: string;
  public get confirmText(): string { return this._confirmText; }

  private _rejectText: string;
  public get rejectText(): string { return this._rejectText; }

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this._title = 'Please Confirm';
    this._prompt = data.prompt || 'Are you sure?';
    this._confirmText = data.confirmText || 'Confirm';
    this._rejectText = data.rejectText || 'Reject';
  }

  public confirm(): void {
    return this.dialogRef.close(true);
  }

  public reject(): void {
    return this.dialogRef.close(false);
  }

}
