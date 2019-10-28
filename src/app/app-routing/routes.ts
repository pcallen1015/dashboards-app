import { Routes } from '@angular/router';

// Admin
import { ContentManagementComponent } from '../admin/content-management/content-management.component';

import { HomeContainerComponent } from '../home/home-container/home-container.component';
import { BrowseWorkspacesComponent } from '../workspaces/browse-workspaces/browse-workspaces.component';
import { WorkspaceContainerComponent } from '../workspaces/workspace-container/workspace-container.component';
import { AboutWorkspaceComponent } from '../workspaces/about-workspace/about-workspace.component';
import { AboutModuleComponent } from '../modules/about-module/about-module.component';
import { ModuleContainerComponent } from '../modules/module-container/module-container.component';
import { ViewContainerComponent } from '../views/view-container/view-container.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeContainerComponent },
    { path: 'workspaces', component: BrowseWorkspacesComponent },
    {
        path: 'workspace/:workspaceSlug',
        component: WorkspaceContainerComponent,
        children: [
            { path: '', redirectTo: 'about', pathMatch: 'full' },
            { path: 'about', component: AboutWorkspaceComponent },
            {
                path: 'module/:moduleSlug',
                component: ModuleContainerComponent,
                children: [
                    { path: '', redirectTo: 'about', pathMatch: 'full' },
                    { path: 'about', component: AboutModuleComponent },
                    { path: 'view/:viewSlug', component: ViewContainerComponent }
                ]
            }
        ]
    },

    // Admin
    { path: 'admin/content-management', component: ContentManagementComponent },
];