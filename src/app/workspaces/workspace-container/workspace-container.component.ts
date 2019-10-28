import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { WorkspacesService } from '../workspaces.service';
import { Workspace } from '../workspace';

@Component({
  selector: 'workspace-container',
  templateUrl: './workspace-container.component.html',
  styleUrls: ['./workspace-container.component.css']
})
export class WorkspaceContainerComponent implements OnInit {
  private _isReady: boolean = false;
  public get isReady(): boolean { return this._isReady; }

  private _workspace: Workspace;
  public get workspace(): Workspace { return this._workspace; }

  constructor(
    private workspacesService: WorkspacesService,
    private route: ActivatedRoute,
  ) {}

  private init(slug: string): void {
    this._isReady = false;
    this.workspacesService.getWorkspaceBySlug(slug).subscribe((workspace: Workspace) => {
      this._workspace = workspace;
      this.workspacesService.activateWorkspace(this._workspace);
      this._isReady = true;
    });
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      return this.init(params.get('workspaceSlug'));
    });
  }

  public ngOnDestroy(): void {
    this.workspacesService.activateWorkspace(null);
  }

}
