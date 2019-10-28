import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GravityApplicationsModule } from './applications/applications.module';
import { GravityBoardsModule } from './boards/boards.module';

@NgModule({
  imports: [
    CommonModule,

    GravityApplicationsModule,
    GravityBoardsModule,
  ],
  exports: [
    GravityApplicationsModule,
    GravityBoardsModule,
  ]
})
export class GravityModule { }
