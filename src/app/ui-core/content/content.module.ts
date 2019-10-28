import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatDialogModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
  MatOptionModule,
  MatSelectModule,
  MatButtonModule,
} from '@angular/material';

import { ContentService } from './content.service';
import { BrowseContentComponentsDialogComponent } from './browse-content-components-dialog/browse-content-components-dialog.component';
import { ConfigureContentContainerDialogComponent } from './configure-content-container-dialog/configure-content-container-dialog.component';
import { ConfigureContentContainerFormComponent } from './configure-content-container-form/configure-content-container-form.component';
import { ConfigureContentContainerOptionFormComponent } from './configure-content-container-form/configure-content-container-option-form/configure-content-container-option-form.component';
import { ContentHostComponent } from './content-host/content-host.component';
import { ContentHostDirective } from './content-host/content-host.directive';

import { NullContentComponent } from './null-content/null-content.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
  ],
  declarations: [
    BrowseContentComponentsDialogComponent,
    ConfigureContentContainerDialogComponent,
    ContentHostComponent,
    ContentHostDirective,
    NullContentComponent,
    ConfigureContentContainerFormComponent,
    ConfigureContentContainerOptionFormComponent,
  ],
  entryComponents: [
    BrowseContentComponentsDialogComponent,
    ConfigureContentContainerDialogComponent,
    NullContentComponent,
  ],
  exports: [    
    ConfigureContentContainerFormComponent,
    ContentHostComponent,
    NullContentComponent,
  ]
})
export class ContentModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContentModule,
      providers: [
        ContentService,
      ]
    }
  }
}
