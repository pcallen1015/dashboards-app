import { Component, Input } from '@angular/core';

@Component({
  selector: 'selection-tile',
  templateUrl: './selection-tile.component.html',
  styleUrls: ['./selection-tile.component.scss']
})
export class SelectionTileComponent<T> {
  @Input() label: string;
  @Input() icon: string = 'icon-plugin';
  @Input() value: T;
  private _selected: boolean = false;

  public get selected(): boolean { return this._selected; }
  public toggle(): void { this._selected = !this.selected; }

}
