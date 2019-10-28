import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApplicationService } from '../../application.service';
import { WorkspacesService } from '../workspaces.service';
import { Workspace } from '../workspace';

@Component({
  selector: 'workspace-browse',
  templateUrl: './browse-workspaces.component.html',
  styleUrls: ['./browse-workspaces.component.css']
})
export class BrowseWorkspacesComponent implements OnInit {  
  private _workspaces: Workspace[] = [];
  public get workspaces(): Workspace[] { return this._workspaces; }

  constructor(
    private applicationService: ApplicationService,
    private workspacesService: WorkspacesService,
    private router: Router,
  ) { }

  private initWorkspaces(): Observable<void> {
    return this.workspacesService.getWorkspacesForActiveApp().pipe(map((workspaces: Workspace[]) => {
      this._workspaces = workspaces;
    }));
  }

  private init(): void {
    zip(
      this.initWorkspaces()
    ).subscribe();
  }

  public ngOnInit(): void {
    this.init();
  }

}
