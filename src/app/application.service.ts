import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Application } from './application';
import { Workspace } from './workspaces/workspace';

@Injectable()
export class ApplicationService {

  private _activeApplication: Application = null;
  public get activeApplication(): Application { return this._activeApplication; }
  public activeApplicationChange: Subject<Application> = new Subject<Application>();

  public constructor(
    private http: HttpClient,
    private titleService: Title,
  ) { }

  private setActiveApplication(application: Application): Application {
    console.info(`Activating Application: ${application ? application.name : 'NULL'}`);
    this.activeApplicationChange.next(this._activeApplication = application);
    return this._activeApplication;
  }

  private refreshActiveApplication(): Observable<Application> {
    console.info(`Refreshing Active Application`);
    return this.getApplicationById(this.activeApplication.applicationId).pipe(map((application: Application) => {
      return this.setActiveApplication(application);
    }));
  }

  public get applications(): Observable<Application[]> {
    return this.http.get('/api/applications').pipe(map((results: any[]) => {
      return results.map((result: any) => new Application(result));
    }));
  }

  public getApplicationById(id: string): Observable<Application> {
    return this.applications.pipe(map((applications: Application[]) => applications.find((application: Application) => application.applicationId === id)));
  }

  public activateApplication(application: Application): Application {
    return this.setActiveApplication(application);
  }

  public setApplicationTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  public addWorkspaceToApplications(workspace: Workspace, applications: Application[]): Observable<void> {
    let body: any = {
      applicationIds: applications.map((application: Application) => application.applicationId) || []
    };
    return this.http.post(`http://localhost:3000/workspaces/${workspace.workspaceId}/addToApplications`, body).pipe(map((result: any) => {
      this.refreshActiveApplication().subscribe();
    }));
  }

}
