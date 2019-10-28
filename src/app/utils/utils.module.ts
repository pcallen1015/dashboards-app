import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material';

import { AppRoutingModule } from '../app-routing/app-routing.module';
import { DragDropModule } from './drag-drop/drag-drop.module';

import { UtilsService } from './utils.service';
import { RecursiveNavItemComponent } from './recursive-nav-item/recursive-nav-item.component';

@NgModule({
  imports: [
    CommonModule,

    MatMenuModule,

    AppRoutingModule,
    DragDropModule,
  ],
  declarations: [
    RecursiveNavItemComponent
  ],
  exports: [
    DragDropModule,
    RecursiveNavItemComponent,
  ],
  providers: [UtilsService],
})
export class UtilsModule { }
