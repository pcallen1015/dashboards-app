import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogRef
} from '@angular/material';
import { BrowseWidgetsDialogComponent } from './browse-widgets-dialog/browse-widgets-dialog.component';
import { ContentComponent } from '../ui-core/content/content-component';

@Injectable()
export class WidgetsService {

  constructor(
    private dialog: MatDialog,
  ) {}

  public browse(): MatDialogRef<BrowseWidgetsDialogComponent, ContentComponent[]> {
    let dialog: MatDialogRef<BrowseWidgetsDialogComponent, ContentComponent[]> = this.dialog.open(BrowseWidgetsDialogComponent, {
      width: '800px'
    });

    dialog.afterClosed().subscribe((selectedComponents: ContentComponent[]) => {
      console.debug(selectedComponents);
    });

    return dialog;
  }
}