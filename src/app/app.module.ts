import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PluginsModule } from './plugins/plugins.module';
import { UiCoreModule } from './ui-core/ui-core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiCoreModule,
    PluginsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
