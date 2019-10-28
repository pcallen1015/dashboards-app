import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';

import { UiCoreModule } from '../ui-core/ui-core.module';
import { ViewsModule } from '../views/views.module';

import { HomeContainerComponent } from './home-container/home-container.component';

@NgModule({
  imports: [
    CommonModule,

    MatCardModule,

    UiCoreModule,
    ViewsModule,
  ],
  declarations: [HomeContainerComponent],
  exports: []
})
export class HomeModule { }
