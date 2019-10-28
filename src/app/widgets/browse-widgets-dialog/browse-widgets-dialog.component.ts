import { Component, ViewChildren, QueryList } from '@angular/core';
import {
  MatDialogRef
} from '@angular/material';
import { ContentService } from '../../ui-core/content/content.service';
import { ContentType } from '../../ui-core/content/content-type';
import { ContentComponent } from '../../ui-core/content/content-component';
import { SelectionTileComponent } from './selection-tile/selection-tile.component';
import { UtilsService } from '../../utils/utils.service';

@Component({
  selector: 'widget-browse-dialog',
  templateUrl: './browse-widgets-dialog.component.html',
  styleUrls: ['./browse-widgets-dialog.component.scss']
})
export class BrowseWidgetsDialogComponent {
  @ViewChildren(SelectionTileComponent) private _tiles: QueryList<SelectionTileComponent<ContentComponent>>;

  constructor(
    public utils: UtilsService,
    public dialogRef: MatDialogRef<BrowseWidgetsDialogComponent>,
    public content: ContentService,
  ) {}

  public get components(): ContentComponent[] { return this.content.contentComponents.filter((component: ContentComponent) => component.type !== ContentType.EMPTY); }
  
  public get selected(): ContentComponent[] {
    if (!this._tiles) return [];
    return this._tiles.filter((tile: SelectionTileComponent<ContentComponent>) => tile.selected).map((tile: SelectionTileComponent<ContentComponent>) => tile.value);
  }
}
