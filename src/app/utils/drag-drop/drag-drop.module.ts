import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDragDropModule } from 'ng-drag-drop';
import { DragDropService } from './drag-drop.service';
import { RecursiveDragDropContainerComponent } from './recursive-drag-drop-container/recursive-drag-drop-container.component';

@NgModule({
  imports: [
    CommonModule,
    NgDragDropModule,
  ],
  declarations: [
    RecursiveDragDropContainerComponent,
  ],
  exports: [
    NgDragDropModule,
    
    RecursiveDragDropContainerComponent,
  ],
  providers: [
    DragDropService,
  ]
})
export class DragDropModule { }
