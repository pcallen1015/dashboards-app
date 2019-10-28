import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, forkJoin, of } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

import { NavItem } from '../ui-core/utils/recursive-dropdown-menu/nav-item.interface';

import { Application } from '../application';
import { ApplicationService } from '../application.service';
import { WorkspacesService } from '../workspaces/workspaces.service';
import { Workspace } from '../workspaces/workspace';
import { ModulesService } from '../modules/modules.service';
import { Module } from '../modules/module';
import { ViewsService } from '../views/views.service';
import { View } from '../views/view';

@Injectable()
export class NavigationService {

  private _activeContentPath: string[] = Array(4).fill(null);
  public get activeContentPath(): string { return this._activeContentPath.filter((element: string) => element).join(' > '); }
  public activeContentPathChange: Subject<string> = new Subject<string>();

  // Manage the primary navigation menu and broadcast changes
  private _primaryNav: NavItem = null;
  public get primaryNav(): NavItem { return this._primaryNav; }
  public primaryNavChange: Subject<NavItem> = new Subject<NavItem>();

  constructor(
    private applicationService: ApplicationService,
    private workspacesService: WorkspacesService,
    private modulesService: ModulesService,
    private viewsService: ViewsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // When the active Application changes, update the first component of the content path
    this.applicationService.activeApplicationChange.subscribe((application: Application) => {
      this.setActiveContentPathComponent(0, (application ? application.name : null));
      this.buildPrimaryNav(application).subscribe();
    });

    // when the active Workspace changes, update the second component of the content path
    this.workspacesService.activeWorkspaceChange.subscribe((workspace: Workspace) => {
      this.setActiveContentPathComponent(1, (workspace ? workspace.name : null));
    });

    // When the active Module changes, update the third component of the content path
    this.modulesService.activeModuleChange.subscribe((module: Module) => {
      this.setActiveContentPathComponent(2, (module ? module.name : null));
    });

    // When the active View changes, update the fourth component of the content path
    this.viewsService.activeViewChange.subscribe((view: View) => {
      this.setActiveContentPathComponent(3, (view ? view.name : null));
    });

    // When the content path changes, update the application title
    this.activeContentPathChange.subscribe((path: string) => {
      this.applicationService.setApplicationTitle(path);
    });
  }

  private setActiveContentPathComponent(index: number, value: string): string {
    this._activeContentPath[index] = value;
    this.activeContentPathChange.next(this.activeContentPath);
    return this.activeContentPath;
  }

  private buildPrimaryNav(application: Application): Observable<NavItem> {
    return this.getNavigationTreeForApplication(application, '', true).pipe(map((nav: NavItem) => {
      this._primaryNav = nav;
      this.primaryNavChange.next(this._primaryNav);
      return this._primaryNav;
    }));
  }

  public getNavigationTreeForApplication(application: Application, relativeTo?: string, withChildren?: boolean): Observable<NavItem> {
    let _router = this.router;
    let _path = (relativeTo || '') + '/workspaces';

    let tree: NavItem = {
      label: 'Workspaces',
      children: [{
        label: 'Browse Workspaces',
        icon: 'info_outline',
        action: () => _router.navigateByUrl(_path)
      }]
    };

    if (withChildren) {
      return this.workspacesService.getWorkspacesForApp(application).pipe(flatMap((workspaces: Workspace[]) => {
        if (workspaces.length === 0) return of(tree);
        let obs: Observable<NavItem>[] = workspaces.map((workspace: Workspace) => this.getNavigationTreeForWorkspace(workspace, '', true));
        return forkJoin(obs).pipe(map((navItems: NavItem[]) => {
          tree.children = tree.children.concat(navItems);
          return tree;
        }));
      }));
    }
    return of(tree);
  }

  public getNavigationTreeForWorkspace(workspace: Workspace, relativeTo?: string, withChildren?: boolean): Observable<NavItem> {
    let _router = this.router;
    let _path = (relativeTo || '') + '/workspace/' + workspace.slug;

    let tree: NavItem = {
      label: workspace.name,
      icon: 'folder',
      children: [{
        label: `About '${workspace.name}'`,
        icon: 'info_outline',
        action: () => _router.navigateByUrl(_path)
      }]
    };

    if (withChildren) {
      return this.modulesService.getModulesForWorkspace(workspace).pipe(flatMap((modules: Module[]) => {
        if (modules.length === 0) return of(tree);
        let obs: Observable<NavItem>[] = modules.map((module: Module) => this.getNavigationTreeForModule(module, _path, true));
        return forkJoin(obs).pipe(map((navItems: NavItem[]) => {
          tree.children = tree.children.concat(navItems);
          return tree;
        }));
      }));
    }
    return of(tree);
  }

  public getNavigationTreeForModule(module: Module, relativeTo?: string, withChildren?: boolean): Observable<NavItem> {
    let _router = this.router;
    let _path = (relativeTo || '') + '/module/' + module.slug;

    let tree: NavItem = {
      label: module.name,
      icon: 'folder',
      children: [{
        label: `About '${module.name}'`,
        icon: 'info_outline',
        action: () => _router.navigateByUrl(_path)
      }]
    };

    if (withChildren) {
      return this.viewsService.getViewsForModule(module).pipe(map((views: View[]) => {
        if (views.length === 0) return tree;
        tree.children = tree.children.concat(views.map((view: View) => {
          return {
            label: view.name,
            icon: 'dashboard',
            action: () => _router.navigate([_path, 'view', view.slug])
          }
        }));

        // Add a trigger for adding a new View to the Module
        // TODO: the presence of this item should be based on PERMISSIONS for the Module
        tree.children.splice(tree.children.length, 0, {
          label: '+ Add New View',
          action: () => {
            this.viewsService.compose(undefined, undefined, undefined, [module]).subscribe((view: View) => {
              if (view) {
                tree.children.splice(tree.children.length - 1, 0, {
                  label: view.name, 
                  action: () => _router.navigate([_path, 'view', view.slug]) 
                });

                // Navigate to new View
                _router.navigate([_path, 'view', view.slug]);
              }
            });
          }
        });

        return tree;
      }));
    }
    return of(tree);
  }
}
