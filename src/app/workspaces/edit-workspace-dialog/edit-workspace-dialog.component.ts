import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';
import { Workspace } from '../workspace';

@Component({
  selector: 'workspace-edit-dialog',
  templateUrl: './edit-workspace-dialog.component.html',
  styleUrls: ['./edit-workspace-dialog.component.scss']
})
export class EditWorkspaceDialogComponent {
  private _workspace: Workspace;
  public get workspace(): Workspace { return this._workspace; }

  private _isNew: boolean = false;
  public get isNew(): boolean { return this._isNew; }

  constructor(
    public dialogRef: MatDialogRef<EditWorkspaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this._workspace = data.workspace || new Workspace();
    this._isNew = data.isNew || false;
  }

  public done(workspace: Workspace): void {
    this.dialogRef.close(workspace);
  }

}
