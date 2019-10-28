import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ModulesService } from '../modules.service';
import { Module } from '../module';

@Component({
  selector: 'module-container',
  templateUrl: './module-container.component.html',
  styleUrls: ['./module-container.component.css'],
})
export class ModuleContainerComponent implements OnInit {
  private _isReady: boolean = false;
  public get isReady(): boolean { return this._isReady; }

  private _module: Module;
  public get module(): Module { return this._module; }

  constructor(
    private modulesService: ModulesService,
    private route: ActivatedRoute
  ) {}

  private init(slug: string): void {
    this._isReady = false;
    this.modulesService.getModuleBySlug(slug).subscribe((module: Module) => {
      this._module = module;
      this._isReady = true;
    });
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      return this.init(params.get('moduleSlug'));
    });
  }

}
