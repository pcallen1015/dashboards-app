import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';

import { ContentModule } from '../content/content.module';

import { PresentationsService } from './presentations.service';
import { PresentationSlideComponent } from './presentation-slide/presentation-slide.component';

@NgModule({
  imports: [
    CommonModule,

    MatDialogModule,
    MatButtonModule,

    ContentModule,
  ],
  declarations: [
    PresentationSlideComponent,
  ],
  entryComponents: [
    PresentationSlideComponent,
  ]
})
export class PresentationsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: PresentationsModule,
      providers: [
        PresentationsService
      ]
    }
  }
}
