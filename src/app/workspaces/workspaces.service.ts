import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable, Subject, of } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

import { Workspace } from './workspace';
import { Application } from '../application';
import { ApplicationService } from '../application.service';
import { UtilsService } from '../utils/utils.service';
import { EditWorkspaceDialogComponent } from './edit-workspace-dialog/edit-workspace-dialog.component';

@Injectable()
export class WorkspacesService {

  private _activeWorkspace: Workspace;
  public get activeWorkspace(): Workspace { return this._activeWorkspace; }
  public activeWorkspaceChange: Subject<Workspace> = new Subject<Workspace>();

  constructor(
    private applicationService: ApplicationService,
    private http: HttpClient,
    private dialog: MatDialog,
    private utils: UtilsService
  ) { }

  private generateId(): string {
    return `workspace-${this.utils.guid()}`;
  }

  private setActiveWorkspace(workspace: Workspace): Workspace {
    console.info(`Activating Workspace: ${(workspace ? workspace.name : 'NULL')}`);
    this.activeWorkspaceChange.next(this._activeWorkspace = workspace);
    return this._activeWorkspace;
  }

  public activateWorkspace(workspace: Workspace): Workspace {
    return this.setActiveWorkspace(workspace);
  }

  public get workspaces(): Observable<Workspace[]> {
    return this.http.get('http://localhost:3000/workspaces').pipe(map((results: any[]) => {
      return results.map((result: any) => new Workspace(result));
    }));
  }

  public getWorkspacesById(ids: string[]): Observable<Workspace[]> {
    return this.workspaces.pipe(map((workspaces: Workspace[]) => workspaces.filter((workspace: Workspace) => ids.indexOf(workspace.workspaceId) > -1)));
  }

  public getWorkspaceBySlug(slug: string): Observable<Workspace> {
    return this.workspaces.pipe(map((workspaces: Workspace[]) => workspaces.find((workspace: Workspace) => workspace.slug === slug)));
  }

  public getWorkspacesForApp(application: Application): Observable<Workspace[]> {
    return this.getWorkspacesById(application.workspaceIds);
  }

  public getWorkspacesForActiveApp(): Observable<Workspace[]> {
    if (!this.applicationService.activeApplication) return of([]);
    return this.getWorkspacesForApp(this.applicationService.activeApplication);
  }

  public about(workspace: Workspace): void {
    workspace = workspace || this._activeWorkspace;
    if (workspace) console.log(workspace);
  }

  public create(workspace: Workspace): Observable<Workspace> {
    return this.http.post(`http://localhost:3000/workspaces`, workspace.payload).pipe(map((result: any) => {
      return new Workspace(result);
    }));
  }

  public read(id: string): Observable<Workspace> {
    return this.workspaces.pipe(map((workspaces: Workspace[]) => workspaces.find((workspace: Workspace) => workspace.workspaceId === id)));
  }

  public update(workspace: Workspace): Observable<Workspace> {
    return this.http.post(`http://localhost:3000/workspaces/${workspace.workspaceId}`, workspace.payload).pipe(map((result: any) => {
      return new Workspace(result);
    }));
  }

  public delete(workspace: Workspace): Observable<Object> {
    return this.http.delete(`http://localhost:3000/workspaces/${workspace.workspaceId}`);
  }

  public compose(name: string = null, description: string = null, addToApplications: Application[] = []): Observable<Workspace> {
    let id: string = this.generateId();
    let newWorkspace: Workspace = new Workspace({
      workspaceId: id,
      name: name,
      description: description,
      slug: this.utils.slugify(id)
    });
    return this.edit(newWorkspace, true).pipe(map((workspace: Workspace) => {
      if (workspace && addToApplications.length > 0) this.applicationService.addWorkspaceToApplications(workspace, addToApplications).subscribe();
      return workspace;
    }));
  }

  public edit(workspace: Workspace, isNew: boolean = false): Observable<Workspace> {
    let dialogRef: MatDialogRef<EditWorkspaceDialogComponent> = this.dialog.open(EditWorkspaceDialogComponent, {
      width: '500px',
      data: {
        workspace: workspace,
        isNew: isNew
      }
    });

    return dialogRef.afterClosed().pipe(flatMap((workspace: Workspace) => {
      if (workspace) {
        if (!isNew) return this.update(workspace);
        return this.create(workspace);
      }
      return of(null);
    }));
  }

}
