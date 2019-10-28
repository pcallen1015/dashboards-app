import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModulesService } from '../modules.service';
import { ViewsService } from '../../views/views.service';
import { View } from '../../views/view';

/**
 * Currently, AboutModuleComponent just redirects to the first View
 * within the Module (if present), but, this Component could be used
 * to display information about the Module, if necessary.
 */

@Component({
  selector: 'module-about',
  templateUrl: './about-module.component.html',
  styleUrls: ['./about-module.component.css']
})
export class AboutModuleComponent implements OnInit {
  private _ready: boolean = false;
  public get ready(): boolean { return this._ready; }

  private _loadMessage: string = 'Loading...';
  public get loadMessage(): string { return this._loadMessage; }

  constructor(
    private modulesService: ModulesService, 
    private viewsService: ViewsService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  private redirectToFirstChildView(): void {
    if (this.modulesService.activeModule && this.modulesService.activeModule.viewIds.length > 0) {
      this.viewsService.read(this.modulesService.activeModule.viewIds[0]).subscribe((redirectView: View) => {
        let message = `Redirecting to View: ${redirectView.name}`;
        this._loadMessage = message;
        console.info(message);
        this.router.navigate(['view', redirectView.slug], { relativeTo: this.route.parent });
        this._ready = true;
      }); 
    } else this._ready = true;
  }

  public ngOnInit(): void {
    this.redirectToFirstChildView();
  }

}
