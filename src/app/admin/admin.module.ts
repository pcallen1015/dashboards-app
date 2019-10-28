import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatFormFieldModule,
  MatSelectModule,
} from '@angular/material';
import { NgDragDropModule } from 'ng-drag-drop';
import { UiCoreModule } from '../ui-core/ui-core.module';

import { UtilsModule } from '../utils/utils.module';

import { ContentManagementComponent } from './content-management/content-management.component';

@NgModule({
  imports: [
    CommonModule,

    MatSelectModule,

    NgDragDropModule.forRoot(),

    UiCoreModule,

    UtilsModule,
  ],
  declarations: [
    ContentManagementComponent,
  ]
})
export class AdminModule { }
