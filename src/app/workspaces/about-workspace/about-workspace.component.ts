import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WorkspacesService } from '../workspaces.service';
import { ModulesService } from '../../modules/modules.service';
import { Module } from '../../modules/module';

/**
 * Currently, AboutWorkspaceComponent just redirects to the first Module
 * within the Workspace (if present), but, this Component could be used
 * to display information about the Workspace, if necessary.
 */

@Component({
  selector: 'workspace-about',
  templateUrl: './about-workspace.component.html',
  styleUrls: ['./about-workspace.component.css']
})
export class AboutWorkspaceComponent implements OnInit {
  private _isReady: boolean = false;
  public get isReady(): boolean { return this._isReady; }

  private _loadMessage: string = 'Loading...';
  public get loadMessage(): string { return this._loadMessage; }

  constructor(
    private workspacesService: WorkspacesService,
    private modulesService: ModulesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  private redirectToFirstModule(): void {
    if (this.workspacesService.activeWorkspace && this.workspacesService.activeWorkspace.moduleIds.length > 0) {
      this.modulesService.read(this.workspacesService.activeWorkspace.moduleIds[0]).subscribe((redirectModule: Module) => {
        let message = `Redirecting to Module: ${redirectModule.name}`;
        console.info(message);
        this._loadMessage = message;
        this.router.navigate(['module', redirectModule.slug], { relativeTo: this.route.parent });
        this._isReady = true;
      });
    }
  }

  public ngOnInit(): void {
    this.redirectToFirstModule();
  }

}
