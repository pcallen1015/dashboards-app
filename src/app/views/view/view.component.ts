import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ViewsService } from '../views.service';
import { View } from '../view';
import { ContentService } from '../../ui-core/content/content.service';
import { NotificationsService } from '../../ui-core/notifications/notifications.service';
import { PresentationEvent } from '../../ui-core/presentations/presentation'
import { WidgetConfig } from '../../widgets/widget-config';

import { WidgetGridComponent } from '../../widgets/widget-grid/widget-grid.component';
import { WidgetsService } from '../../widgets/widgets.service';

class ViewState {
  private _timestamp: Date;
  private _state: View;

  constructor(view: View) {
    this._timestamp = new Date();
    this._state = new View(JSON.parse(JSON.stringify(view.payload)));
  }

  public get state(): View { return this._state; }
}

@Component({
  selector: 'view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  @Input() view: View;
  @ViewChild(WidgetGridComponent) private _widgetGrid: WidgetGridComponent;

  // A cached version of the current View, used to revert back after making changes (cancel)
  private _cachedView: View = null;

  private _changeHistory: ViewState[] = [];

  // Track whether the View is currently being edited
  private _editing: boolean = false;
  public get editing(): boolean { return this._editing; }
  public set editing(editing: boolean) { this._editing = editing; }

  // Track whether a change event is in-progress
  private _changeInProgress: boolean = false;
  public get changeInProgress(): boolean { return this._changeInProgress; }

  private _stagedViewState: ViewState = null;

  // Track whether the View is currently being shown in a debugging mode
  private _debugging: boolean = false;
  public get debugging(): boolean { return this._debugging; }

  // Track whether the View is currently being saved
  private _saving: boolean = false;
  public get saving(): boolean { return this._saving; }

  // Track whether the View is currently being presented
  private _presenting: boolean = false;
  public get presenting(): boolean { return this._presenting; }

  constructor(
    private views: ViewsService,
    private widgets: WidgetsService,
    private contentService: ContentService,
    private notifications: NotificationsService,
  ) { }

  private init(): void {
    this.views.activateView(this.view);
  }

  private saveViewState(): void {
    this._changeHistory.push(new ViewState(this.view))
  }

  public ngOnInit(): void {
    return this.init();
  }

  public ngOnDestroy(): void {
    // Deactivate the current View
    this.views.activateView(null);
    this._changeHistory = [];
  }

  /**
   * Determine if the View has any content to display (i.e.: any Widgets)
   */
  public get hasContent(): boolean {
    return this.view && this.view.widgetConfigs && this.view.widgetConfigs.length > 0;
  }

  /**
   * Determine if edits have been made to the View
   */
  public get hasChanges(): boolean {
    return this._changeHistory.length > 0;
  }

  public present(): void {
    this._presenting = true;
    this.views.present(this.view).pipe(catchError((error: Error) => {
      console.error(error);
      return of(PresentationEvent.END);
    })).subscribe((event: PresentationEvent) => {
      if (event === PresentationEvent.END) this._presenting = false;
    });
  }

  /**
   * Refresh the View by refreshing the Widget Grid (if it exists)
   */
  public refresh(): void {
    if (this._widgetGrid) this._widgetGrid.refreshAll();
  }

  /**
   * Reflow the View by reflowing the Widget Grid (if it exists)
   */
  public reflow(): void {
    if (this._widgetGrid) this._widgetGrid.reflowAll();
  }

  /**
   * Put the View in an "editing" state
   */
  public edit(): void {
    if (!this.view.editable || this.saving) return;
    this._cachedView = new View(JSON.parse(JSON.stringify(this.view.payload)));
    this._editing = true;
  }

  /**
   * Add a new Widget to the View
   */
  public addWidget(): void {
    this.views.addWidgetsToView(this.view);
    /*
    this.contentService.browseContentComponents().afterCuiDialogClosed().subscribe((components: ContentComponent[]) => {
      if (components && components.length > 0) {
        this.saveViewState();
        components.forEach((component: ContentComponent) => {
          let space: any = this.views.findFirstOpenSpace(this.view);
          this.view.addWidget(new WidgetConfig({
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
    */
  }

  /**
   * Removes a Widget from the View
   * @param config The Widget Config to remove
   */
  public removeWidget(config: WidgetConfig): void {
    this.saveViewState();
    let idx: number = this.view.widgetConfigs.indexOf(config);
    if (idx > -1) this.view.widgetConfigs.splice(idx, 1);
  }

  /**
   * Toggle the debugging state
   */
  public debug(): void {
    this._debugging = !this._debugging;
  }

  /**
   * Undo the last change to the View
   */
  public undo(): void {
    if (this._changeHistory.length > 0) this.view = this._changeHistory.pop().state;
  }

  /**
   * Save changes to the View
   */
  public save(): void {
    if (!this.view.editable || this.saving) return;
    this._saving = true;
    
    // TODO: handle errors in the save procedure
    this.views.update(this.view).subscribe((updatedView: View) => {
      this._cachedView = null;
      this._changeHistory = [];
      this._editing = false;
      this._saving = false;
      this.notifications.simpleSnackBar('View Saved Successfully!', '', 5000);
      // this.notifications.toast('success', null, 'View Saved Successfully!', 'regular');
    });
  }

  /**
   * Cancel any editing changes by restoring the cached version of the View
   */
  public cancel(): void {
    if (!this.view.editable) return;
    this.view = this._cachedView;
    this._cachedView = null;
    this._changeHistory = [];
    this._editing = false;
  }

  public onWidgetGridChangeStart(event: any): void {
    if (this.debugging) console.debug('ViewComponent :: start', event);
    this._changeInProgress = true;
    
    // STAGE the current View (only add it to the history, if the change actually happens)
    this._stagedViewState = new ViewState(this.view);
  }

  public onWidgetGridChange(event: any): void {
    if (this.debugging) console.debug('ViewComponent :: change', event);
    if (this._stagedViewState) this._changeHistory.push(this._stagedViewState);
    this._stagedViewState = null;
  }

  public onWidgetGridChangeEnd(event: any): void {
    if (this.debugging) console.debug('ViewComponent :: end', event);
    this._stagedViewState = null;
    this._changeInProgress = false;
  }

}
