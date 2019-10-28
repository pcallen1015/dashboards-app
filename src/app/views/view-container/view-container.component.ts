import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { ModulesService } from '../../modules/modules.service';
import { ViewsService } from '../views.service';
import { View } from '../view';

@Component({
  selector: 'view-container',
  templateUrl: './view-container.component.html',
  styleUrls: ['./view-container.component.css']
})
export class ViewContainerComponent implements OnInit {
  private _isReady: boolean = false;
  public get isReady(): boolean { return this._isReady; }

  private _view: View;
  public get view(): View { return this._view; }

  constructor(
    private modulesService: ModulesService,
    private viewsService: ViewsService,
    private route: ActivatedRoute,
  ) {}

  private initView(slug: string): Observable<void> {
    return this.viewsService.getViewBySlug(slug).pipe(map((view: View) => {
      this._view = view;
    }));
    // if (this.modulesService.activeModule.viewIds.indexOf(this._view.viewId) === -1) throw new Error('Invalid View');
  }

  private init(slug: string): void {
    this._isReady = false;
    zip(
      this.initView(slug)
    ).subscribe(() => this._isReady = true);
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      return this.init(params.get('viewSlug'));
    });
  }

}
