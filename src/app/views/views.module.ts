import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
} from '@angular/material';

import { WidgetsModule } from '../widgets/widgets.module';
import { ViewsService } from './views.service';
import { ViewComponent } from './view/view.component';
import { ViewContainerComponent } from './view-container/view-container.component';
import { EditViewFormComponent } from './edit-view-form/edit-view-form.component';
import { EditViewDialogComponent } from './edit-view-dialog/edit-view-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    MatButtonModule,
    MatDialogModule,
    MatInputModule,

    WidgetsModule.forRoot()
  ],
  declarations: [
    ViewComponent,
    ViewContainerComponent,
    EditViewFormComponent,
    EditViewDialogComponent,
  ],
  entryComponents: [
    EditViewDialogComponent,
  ],
  exports: [
    ViewComponent,
    ViewContainerComponent,
  ]
})
export class ViewsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ViewsModule,
      providers: [ViewsService]
    }
  }
}
