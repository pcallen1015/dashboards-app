import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { PluginsModule } from './plugins/plugins.module';
import { UiCoreModule } from './ui-core/ui-core.module';

// Admin Module
import { AdminModule } from './admin/admin.module';

// Workspaces
import { WorkspacesModule } from './workspaces/workspaces.module';
import { WidgetsModule } from './widgets/widgets.module';
import { ViewsModule } from './views/views.module';
import { UtilsModule } from './utils/utils.module';
import { UsersModule } from './users/users.module';
import { ModulesModule } from './modules/modules.module';
import { HomeModule } from './home/home.module';
import { ApplicationService } from './application.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    AppRoutingModule.forRoot(),
    UiCoreModule,
    PluginsModule,

    AdminModule,
    HomeModule,
    UsersModule,
    UtilsModule,

    WorkspacesModule.forRoot(),
    ModulesModule.forRoot(),
    ViewsModule.forRoot(),
    WidgetsModule.forRoot(),
    
  ],
  providers: [ApplicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
