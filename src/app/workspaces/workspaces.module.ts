import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatGridListModule,
  MatInputModule,
} from '@angular/material';
import { UtilsModule } from '../ui-core/utils/utils.module';

import { AppRoutingModule } from '../app-routing/app-routing.module';
import { ModulesModule } from '../modules/modules.module';

import { WorkspacesService } from './workspaces.service';
import { BrowseWorkspacesComponent } from './browse-workspaces/browse-workspaces.component';
import { WorkspaceCardComponent } from './workspace-card/workspace-card.component';
import { WorkspaceContainerComponent } from './workspace-container/workspace-container.component';
import { AboutWorkspaceComponent } from './about-workspace/about-workspace.component';
import { EditWorkspaceDialogComponent } from './edit-workspace-dialog/edit-workspace-dialog.component';
import { EditWorkspaceFormComponent } from './edit-workspace-form/edit-workspace-form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
  
    UtilsModule,

    AppRoutingModule,
    ModulesModule,
  ],
  declarations: [
    BrowseWorkspacesComponent,
    WorkspaceCardComponent,
    WorkspaceContainerComponent,
    AboutWorkspaceComponent,
    EditWorkspaceDialogComponent,
    EditWorkspaceFormComponent,
  ],
  entryComponents: [
    EditWorkspaceDialogComponent,
  ],
  exports: [
    BrowseWorkspacesComponent,
  ],
})
export class WorkspacesModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: WorkspacesModule,
      providers: [WorkspacesService]
    }
  }
}
