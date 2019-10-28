import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatGridListModule,
} from '@angular/material';

import { GridsterModule } from 'angular2gridster';

import { UiCoreModule } from '../ui-core/ui-core.module';

import { WidgetsService } from './widgets.service';
import { WidgetComponent } from './widget/widget.component';
import { WidgetGridComponent } from './widget-grid/widget-grid.component';
import { BrowseWidgetsDialogComponent } from './browse-widgets-dialog/browse-widgets-dialog.component';
import { SelectionTileComponent } from './browse-widgets-dialog/selection-tile/selection-tile.component';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatDialogModule,
    MatGridListModule,

    GridsterModule.forRoot(),
    
    UiCoreModule,
  ],
  declarations: [
    WidgetComponent,
    WidgetGridComponent,
    BrowseWidgetsDialogComponent,
    SelectionTileComponent,
  ],
  entryComponents: [
    BrowseWidgetsDialogComponent,
  ],
  exports: [
    WidgetComponent,
    WidgetGridComponent,

    UiCoreModule,
  ]
})
export class WidgetsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: WidgetsModule,
      providers: [
        WidgetsService
      ]
    }
  }
}
