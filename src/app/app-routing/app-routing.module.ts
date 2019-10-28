import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './routes';

import { NavigationService } from './navigation.service';

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppRoutingModule,
      providers: [NavigationService]
    }
  }
}
