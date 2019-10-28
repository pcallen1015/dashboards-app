import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  MatSidenavModule
} from '@angular/material';
import { UtilsModule } from '../ui-core/utils/utils.module';

import { AppRoutingModule } from '../app-routing/app-routing.module';


import { ViewsModule } from '../views/views.module';

import { ModulesService } from './modules.service';
import { ModuleContainerComponent } from './module-container/module-container.component';
import { ModuleComponent } from './module/module.component';
import { AboutModuleComponent } from './about-module/about-module.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,

    MatSidenavModule,

    UtilsModule,

    AppRoutingModule,

    ViewsModule.forRoot()
  ],
  declarations: [
    ModuleContainerComponent,
    ModuleComponent,
    AboutModuleComponent,
  ],
  exports: [ModuleComponent]
})
export class ModulesModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ModulesModule,
      providers: [ModulesService]
    }
  }
}
