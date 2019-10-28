import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { GravityApplicationsService } from './applications.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    GravityApplicationsService,
  ]
})
export class GravityApplicationsModule { }
