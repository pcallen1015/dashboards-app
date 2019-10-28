import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

import {
  MatDialogRef,
  MatDialog
} from '@angular/material';

import { ContentComponent } from '../ui-core/content/content-component';
import { Presentation, PresentationEvent } from '../ui-core/presentations/presentation';
import { PresentationSlide } from '../ui-core/presentations/presentation-slide/presentation-slide';
import { PresentationsService } from '../ui-core/presentations/presentations.service';

import { UtilsService } from '../utils/utils.service';
import { Module } from '../modules/module';
import { ModulesService } from '../modules/modules.service';
import { View } from './view';
import { WidgetsService } from '../widgets/widgets.service';
import { WidgetConfig } from '../widgets/widget-config';
import { EditViewDialogComponent } from './edit-view-dialog/edit-view-dialog.component';

@Injectable()
export class ViewsService {

  // Keep track of the currently-active View and allow clients to watch for changes
  private _activeView: View = null;
  public activeViewChange: Subject<View> = new Subject<View>();

  constructor(
    private utils: UtilsService,
    private modulesService: ModulesService,
    private presentations: PresentationsService,
    private widgets: WidgetsService,
    private http: HttpClient,
    private dialog: MatDialog,
  ) { }

  /**
   * Generates a GUID for a view
   */
  private generateViewId(): string {
    return `view-${this.utils.guid()}`;
  }

  /**
   * Sets the currently active View and signals the change to subscribers
   * @param view The View to set as active
   */
  private setActiveView(view: View): View {
    console.info(`Activating View: ${view ? view.name : 'NULL'}`);
    this.activeViewChange.next(this._activeView = view);
    return this._activeView;
  }

  private generatePresentation(view: View): Presentation {
    let pres: Presentation = new Presentation(view.name);
    view.widgetConfigs.forEach((config: WidgetConfig) => {
      pres.addSlide(new PresentationSlide(config.title, config.contentConfig));
    });
    return pres;
  }

  public present(view: View): Observable<PresentationEvent> {
    return this.presentations.present(this.generatePresentation(view));
  }

  /**
   * Activate a specified View
   * @param view The View to activate
   */
  public activateView(view: View): View {
    return this.setActiveView(view);
  }

  /**
   * Get all available Views
   */
  public get views(): Observable<View[]> {
    return this.http.get('http://localhost:3000/views').pipe(map((results: any[]) => {
      return results.map((result: any) => new View(result));
    }));
  }

  /**
   * Get multiple Views by their viewId property
   * @param viewIds The list of viewIds for the desired Views
   */
  public getViewsById(viewIds: string[]): Observable<View[]> {
    return this.views.pipe(map((views: View[]) => views.filter((view: View) => viewIds.indexOf(view.viewId) > -1)));
  }

  /**
   * Get a single View by its slug property
   * @param slug The slug (i.e.: URL path) of the desired View
   */
  public getViewBySlug(slug: string): Observable<View> {
    return this.views.pipe(map((views: View[]) => views.find((view: View) => view.slug === slug)));
  }

  /**
   * Get Views for a given Module
   * @param module the Module for which to find Views
   */
  public getViewsForModule(module: Module): Observable<View[]> {
    return this.getViewsById(module.viewIds);
  }

  /**
   * Get Views for the currently active Module
   */
  public getViewsForActiveModule(): Observable<View[]> {
    if (!this.modulesService.activeModule) return of([]);
    return this.getViewsForModule(this.modulesService.activeModule);
  }

  public create(view: View): Observable<View> {
    return this.http.post(`http://localhost:3000/views`, view.payload).pipe(map((result: any) => {
      return new View(result);
    }));
  }

  public read(id: string): Observable<View> {
    return this.views.pipe(map((views: View[]) => views.find((view: View) => view.viewId === id)));
  }

  public update(view: View): Observable<View> {
    return this.http.post(`http://localhost:3000/views/${view.viewId}`, view.payload).pipe(map((result: any) => {
      return new View(result);
    }));
  }

  public delete(view: View): Observable<Object> {
    return this.http.delete(`http://localhost:3000/views/${view.viewId}`);
  }

  public compose(viewId: string = this.generateViewId(), name: string = null, description: string = null, addToModules: Module[] = []): Observable<View> {
    let view: View = new View({
      viewId: viewId,
      name: name,
      description: description,
      slug: this.utils.slugify(viewId),
      editable: true
    });
    return this.edit(view, true).pipe(map((view: View) => {
      if (view && addToModules && addToModules.length > 0) {
        this.addViewToModules(view, addToModules).subscribe();
      }
      return view;
    }));
  }

  /**
   * Displays a dialog in which the user can edit the details (i.e.: name, description) for the given View
   * @param view the View being edited
   */
  public edit(view: View, isNew: boolean): Observable<View> {
    let dialogRef: MatDialogRef<EditViewDialogComponent> = this.dialog.open(EditViewDialogComponent, {
      width: '500px',
      data: {
        view: view,
        isNew: isNew
      }
    });

    return dialogRef.afterClosed().pipe(flatMap((view: View) => {
      if (view) {
        if (isNew) return this.create(view);
        return this.update(view);
      }
      return of(null);
    }));
  }

  public addWidgetsToView(view: View) {
    this.widgets.browse().afterClosed().subscribe((components: ContentComponent[]) => {
      if (components && components.length > 0) {
        components.forEach((component: ContentComponent) => {
          let space: any = this.findFirstOpenSpace(view);
          view.addWidget(new WidgetConfig({
            x: space.x,
            y: space.y,
            h: space.h,
            w: space.w,
            contentConfig: {
              contentComponentId: component.componentId
            }
          }));
        });
      }
    });
  }

  /**
   * Adds the given View to the given Modules
   * @param view the View
   * @param modules the Modules into which the View will be added
   */
  public addViewToModules(view: View, modules: Module[]): Observable<Object> {
    return this.http.post(`http://localhost:3000/views/${view.viewId}/addToModules`, {
      moduleIds: modules.map((module: Module) => { return module.moduleId; }) || []
    });
  }

  /**
   * Determines if a space in a View is occupied (i.e.: if a Widget is present there)
   * @param x The x-coordinate of the space being tested
   * @param y The y-coordinate of the space being tested
   * @param view The View in which we are testing the space
   */
  private spaceIsOccupied(x: number, y: number, view: View): boolean {
    let isOccupied: boolean = false;
    view.widgetConfigs.forEach((config: WidgetConfig) => {
      if (
        (x >= config.x) && ((config.x + (config.w - 1)) >= x)
        &&
        (y >= config.y) && ((config.y + (config.h - 1)) >= y)
      ) isOccupied = true;
    });
    return isOccupied;
  }

  /**
   * Finds the first available 1x1 space within a View
   * 
   * NOTE: This is pretty "dumb" right now. This approach currently doesn't
   * look for the "best" space, just the first available 1x1 space. It would be
   * cool if we could analyze the View and determine the "best" placement,
   * both in terms of location AND size.
   * 
   * @param view The View in which we are looking for an available space
   */
  public findFirstOpenSpace(view: View): any {
    let y: number = 0;
    while (true) {
      for (let x: number = 0; x < view.columns; x++) {
        if (!this.spaceIsOccupied(x, y, view)) return { x: x, y: y, h: 1, w: 1 };
      }
      y++;
    }
  }

}
