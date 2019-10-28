import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
} from '@angular/material';

import { UtilsService } from './utils.service';
import { OverlayComponent } from './overlay/overlay.component';
import { RecursiveDropdownMenuComponent } from './recursive-dropdown-menu/recursive-dropdown-menu.component';

@NgModule({
  imports: [
    CommonModule,  

    MatButtonModule,
    MatIconModule,
    MatMenuModule, 
  ],
  declarations: [
    OverlayComponent,
    RecursiveDropdownMenuComponent,
  ],
  exports: [    
    MatButtonModule,
    MatIconModule,
    MatMenuModule, 
    
    OverlayComponent,
    RecursiveDropdownMenuComponent,
  ],
  providers: [
    UtilsService,
  ]
})
export class UtilsModule { }
