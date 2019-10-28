import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { Application } from '../../application';
import { ApplicationService } from '../../application.service';
import { Workspace } from '../../workspaces/workspace';
import { WorkspacesService } from '../../workspaces/workspaces.service';
import { Module } from '../../modules/module';
import { ModulesService } from '../../modules/modules.service';
import { View } from '../../views/view';
import { ViewsService } from '../../views/views.service';
import { DragDropItem } from './drag-drop-item'

@Injectable()
export class DragDropService {

  constructor(
    private applicationsService: ApplicationService,
    private workspacesService: WorkspacesService,
    private modulesService: ModulesService,
    private viewsService: ViewsService,
  ) { }

  public getDragDropHierarchyForView(view: View): Observable<DragDropItem> {
    let item: DragDropItem = new DragDropItem(view.name, 'view', [], 'Widget', () => {}, () => { console.debug(`delete ${item.name}`); });
    return of(item);
  }

  public getDragDropHierarchyForModule(module: Module): Observable<DragDropItem> {
    let item: DragDropItem = new DragDropItem(module.name, 'module', [], 'View', () => { console.debug('compose View'); }, () => {});

    return this.viewsService.getViewsForModule(module).pipe(flatMap((views: View[]) => {
      if (views.length === 0) return of(item);
      let obs: Observable<DragDropItem>[] = views.map((view: View) => this.getDragDropHierarchyForView(view));
      return forkJoin(obs).pipe(map((viewItems: DragDropItem[]) => {
        viewItems.forEach((viewItem: DragDropItem) => item.addChild(viewItem))
        return item;
      }));
    }));
  }

  public getDragDropHierarchyForWorkspace(workspace: Workspace): Observable<DragDropItem> {
    let item: DragDropItem = new DragDropItem(workspace.name, 'workspace', [], 'Module', () => { console.debug('compose Module'); }, () => {
      this.workspacesService.delete(workspace).subscribe();
    });

    return this.modulesService.getModulesForWorkspace(workspace).pipe(flatMap((modules: Module[]) => {
      if (modules.length === 0) return of(item);
      let obs: Observable<DragDropItem>[] = modules.map((module: Module) => this.getDragDropHierarchyForModule(module));
      return forkJoin(obs).pipe(map((moduleItems: DragDropItem[]) => {
        moduleItems.forEach((moduleItem: DragDropItem) => item.addChild(moduleItem));
        return item;
      }));
    }));
  }

  public getDragDropHierarchyForApplication(application: Application): Observable<DragDropItem> {
    let item: DragDropItem = new DragDropItem(application.name, 'application', [], 'Workspace', () => {
      this.workspacesService.compose('New Workspace', 'A new Workspace', [this.applicationsService.activeApplication]).subscribe((workspace: Workspace) => {
        if (workspace) this.getDragDropHierarchyForWorkspace(workspace).subscribe((result) => item.addChild(result));
      });
    }, () => {
      console.warn('Cannot delete an Application');
    });

    return this.workspacesService.getWorkspacesForApp(application).pipe(flatMap((workspaces: Workspace[]) => {
      if (workspaces.length === 0) return of(item);
      let obs: Observable<DragDropItem>[] = workspaces.map((workspace: Workspace) => this.getDragDropHierarchyForWorkspace(workspace));
      return forkJoin(obs).pipe(map((workspaceItems: DragDropItem[]) => {
        workspaceItems.forEach((workspaceItem: DragDropItem) => item.addChild(workspaceItem));
        return item;
      }));
    }));
  }

}
