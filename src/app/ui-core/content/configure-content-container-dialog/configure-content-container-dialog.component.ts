import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';

import { ContentConfigOption } from '../content-config-option';
import { ContentConfig } from '../content-config';

@Component({
  selector: 'content-configure-dialog',
  templateUrl: './configure-content-container-dialog.component.html',
  styleUrls: ['./configure-content-container-dialog.component.css']
})
export class ConfigureContentContainerDialogComponent {
  private _config: ContentConfig;
  public get config(): ContentConfig { return this._config; }
  
  private _options: ContentConfigOption[] = [];
  public get options(): ContentConfigOption[] { return this._options; }

  constructor(
    public dialogRef: MatDialogRef<ConfigureContentContainerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this._config = data.config || new ContentConfig();
    this._options = data.options || [];
  }

  public done(config: ContentConfig): void {
    this.dialogRef.close(config);
  }

}
