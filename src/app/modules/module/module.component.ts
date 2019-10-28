import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Module } from '../module';
import { ModulesService } from '../modules.service';
import { View } from '../../views/view';
import { ViewsService } from '../../views/views.service';

@Component({
  selector: 'module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit, OnDestroy {
  @Input() module: Module;

  private _otherModules: Module[];
  public get otherModules(): Module[] { return this._otherModules; }

  private _views: View[] = [];
  public get views(): View[] { return this._views; }

  constructor(
    private modulesService: ModulesService,
    private viewsService: ViewsService,
  ) {}

  private initViews(): Observable<void> {
    return this.viewsService.getViewsForModule(this.module).pipe(map((views: View[]) => {
      this._views = views;
    }));
  }

  private initOtherModules(): Observable<void> {
    return this.modulesService.getOtherModulesForActiveWorkspace(this.module).pipe(map((modules: Module[]) => {
      this._otherModules = modules;
    }));
  }

  private init(): void {
    this.modulesService.activateModule(this.module);
    zip(
      this.initViews(),
      this.initOtherModules()
    ).subscribe();
  }

  public ngOnInit(): void {
    return this.init();
  }

  public ngOnDestroy(): void {
    this.modulesService.activateModule(null);
  }

}
