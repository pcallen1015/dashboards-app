import { Component, Inject } from '@angular/core';
import {
  MatSelectionList,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';

import { ContentComponent } from '../content-component';

@Component({
  selector: 'content-browse-dialog',
  templateUrl: './browse-content-components-dialog.component.html',
  styleUrls: ['./browse-content-components-dialog.component.css']
})
export class BrowseContentComponentsDialogComponent {
  private _components: ContentComponent[] = [];

  constructor(
    public dialogRef: MatDialogRef<BrowseContentComponentsDialogComponent, ContentComponent[]>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this._components = data.components || [];
  }

  public get components(): ContentComponent[] { return this._components; }

  public done(list: MatSelectionList): void {
    this.dialogRef.close(list.selectedOptions.selected.map(item => item.value));
  }

  public cancel(): void {
    this.dialogRef.close([]);
  }

}
