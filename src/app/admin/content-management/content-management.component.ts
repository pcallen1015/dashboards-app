import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { Workspace } from '../../workspaces/workspace';
import { WorkspacesService } from '../../workspaces/workspaces.service';
import { ModulesService } from '../../modules/modules.service';
import { Module } from '../../modules/module';
import { DropEvent } from 'ng-drag-drop';

import { DragDropItem } from '../../utils/drag-drop/drag-drop-item';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.scss']
})
export class ContentManagementComponent implements OnInit {
  private _loading: any = {};
  public get loading(): boolean {
    let isLoading: boolean = false;
    Object.keys(this._loading).forEach(key => {
      if (this._loading[key]) isLoading = true;
    });
    return isLoading;
  }

  public root: DragDropItem;

  private _workspaces: Workspace[] = [];
  public get workspaces(): Workspace[] { return this._workspaces; }

  private _selectedWorkspace: Workspace = null;
  public get selectedWorkspace(): Workspace { return this._selectedWorkspace; }
  public set selectedWorkspace(workspace: Workspace) { this._selectedWorkspace = workspace; }

  private _modules: Module[] = [];
  public get modules(): Module[] { return this._modules; }

  constructor(
    private workspacesService: WorkspacesService,
    private modulesService: ModulesService,
  ) { }

  private initWorkspaces(): void {
    this._loading.workspaces = true;
    this.workspacesService.getWorkspacesForActiveApp().subscribe((workspaces: Workspace[]) => {
      this._workspaces = workspaces;
      this._loading.workspaces = false;
    });
  }

  private initModules(): void {
    if (!this._selectedWorkspace) return;
    this._loading.modules = true;
    this.modulesService.getModulesForWorkspace(this._selectedWorkspace).subscribe((modules: Module[]) => {
      this._modules = modules;
      this._loading.modules = false;
    });
  }

  private init(): void {
    this.initWorkspaces();
  }

  public ngOnInit(): void {
    this.root = new DragDropItem('root', 'root', [
      new DragDropItem('Workspace A', 'workspace', [
        new DragDropItem('Module A.1', 'module', [
          new DragDropItem('View A.1.a', 'view'),
          new DragDropItem('View A.1.b', 'view')
        ], 'View'),
        new DragDropItem('Module A.2', 'module', [], 'View'),
        new DragDropItem('Module A.3', 'module', [
          new DragDropItem('View A.3.a', 'view'),
          new DragDropItem('View A.3.b', 'view')
        ], 'View')
      ], 'Module'),
      new DragDropItem('Workspace B', 'workspace', [
        new DragDropItem('Module B.1', 'module', [], 'View'),
        new DragDropItem('Module B.2', 'module', [
          new DragDropItem('View B.2.a', 'view'),
          new DragDropItem('View B.2.b', 'view')
        ], 'View'),
        new DragDropItem('Module B.3', 'module', [], 'View')
      ], 'Module'),
      new DragDropItem('Workspace C', 'workspace', [], 'Module')
    ], 'Workspace');


    return this.init();
  }

  public onSelectedWorkspaceChange(change: MatSelectChange): void {
    this._selectedWorkspace = change.value;
    this.initModules();
  }

  public createWorkspace(): void {
    // TODO
    console.debug('create workspace');
  }

  public onDeleteItem(parent: DragDropItem, child: DragDropItem): void {
    parent.removeChild(child);
  }

}
