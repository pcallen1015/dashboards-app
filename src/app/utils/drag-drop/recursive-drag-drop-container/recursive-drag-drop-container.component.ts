import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DragDropItem } from '../drag-drop-item';
import { DropEvent } from 'ng-drag-drop';

@Component({
  selector: 'util-recursive-drag-drop-container',
  templateUrl: './recursive-drag-drop-container.component.html',
  styleUrls: ['./recursive-drag-drop-container.component.scss']
})
export class RecursiveDragDropContainerComponent {
  @Input() parent: DragDropItem;
  @Input() item: DragDropItem;

  /**
   * Add a new child to this item
   */
  public add(): void {
    // add new child to item
    console.warn(`add: ${this.item.name}`);
  }

  /**
   * Delete this item from its parent
   */
  public delete(): void {
    this.parent.removeChild(this.item);
  }

  /**
   * Handle an item being dropped in this container
   * @param event the DropEvent (event.dragData contains the original container and the dropped item)
   */
  public onItemDrop(event: DropEvent): void {
    let fromContainer: DragDropItem = event.dragData[0];
    let item: DragDropItem = event.dragData[1];

    // Ensure the item wasn't dropped back into the same container
    if (!(this.item && fromContainer) || (this.item === fromContainer)) return;

    // Remove item from the original container
    fromContainer.removeChild(item);

    // Add item to this container
    this.item.addChild(item);
  }

}
