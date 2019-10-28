import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Workspace } from '../workspaces/workspace';
import { Module } from './module';
import { WorkspacesService } from '../workspaces/workspaces.service';

@Injectable()
export class ModulesService {
  
  private _activeModule: Module = null;
  public get activeModule(): Module { return this._activeModule; }
  public activeModuleChange: Subject<Module> = new Subject<Module>();

  constructor(
    private http: HttpClient,
    private workspacesService: WorkspacesService,
  ) { }

  private setActiveModule(module: Module): Module {
    console.info(`Activating Module: ${module ? module.name : 'NULL'}`);
    this.activeModuleChange.next(this._activeModule = module);
    return this._activeModule;
  }

  public activateModule(module: Module): Module {
    return this.setActiveModule(module);
  }

  public get modules(): Observable<Module[]> {
    return this.http.get('http://localhost:3000/modules').pipe(map((results: any[]) => {
      return results.map((result: any) => new Module(result));
    }));
  }

  public getModulesById(ids: string[]): Observable<Module[]> {
    return this.modules.pipe(map((modules: Module[]) => modules.filter((module: Module) => ids.indexOf(module.moduleId) > -1)));
  }

  public getModuleBySlug(slug: string): Observable<Module> {
    return this.modules.pipe(map((modules: Module[]) => modules.find((module: Module) => module.slug === slug)));
  }

  public getModulesForWorkspace(workspace: Workspace): Observable<Module[]> {
    return this.getModulesById(workspace.moduleIds);
  }

  public getModulesForActiveWorkspace(): Observable<Module[]> {
    if (!this.workspacesService.activeWorkspace) return of([]);
    return this.getModulesForWorkspace(this.workspacesService.activeWorkspace);
  }

  public getOtherModulesForActiveWorkspace(currentModule: Module): Observable<Module[]> {
    return this.getModulesForActiveWorkspace().pipe(map((modules: Module[]) => modules.filter((module: Module) => module.moduleId !== currentModule.moduleId)));
  }

  public compose(): Observable<Module> {
    // TODO
    return Observable.throw(new Error('Not Implemented'));
  }

  public edit(module: Module, isNew: boolean = false): Observable<Module> {
    // TODO
    return Observable.throw(new Error('Not Implemented'));
  }

  public create(): Observable<Module> {
    // TODO
    return Observable.throw(new Error('Not Implemented'));
  }

  public read(id: string): Observable<Module> {
    return this.modules.pipe(map((modules: Module[]) => modules.find((module: Module) => module.moduleId === id)));
  }

  public update(module: Module): Observable<Module> {
    // TODO
    return Observable.throw(new Error('Not Implemented'));
  }

  public delete(module: Module): Observable<void> {
    // TODO
    return Observable.throw(new Error('Not Implemented'));
  }

}
