import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UiCoreModule } from './ui-core/ui-core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
