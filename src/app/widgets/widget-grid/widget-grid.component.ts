import { Component,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';

import { GridsterComponent } from 'angular2gridster';

import { WidgetComponent } from '../widget/widget.component';
import { WidgetsService } from '../widgets.service';
import { WidgetConfig } from '../widget-config';

@Component({
  selector: 'widget-grid',
  templateUrl: './widget-grid.component.html',
  styleUrls: ['./widget-grid.component.scss']
})
export class WidgetGridComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() editable: boolean = false;
  @Input() columns: number = 6;
  @Input() configs: WidgetConfig[] = [];
  @Input() editing: boolean = false;
  @Input() debugging: boolean = false;
  @Output() onRemoveWidget: EventEmitter<WidgetConfig> = new EventEmitter<WidgetConfig>();

  @Output() onChangeStart: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChangeEnd: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(GridsterComponent) gridster: GridsterComponent;

  @ViewChildren(WidgetComponent) containerRefs: QueryList<WidgetComponent>;
  private widgetContainers: WidgetComponent[] = [];

  public gridsterConfig = {
    lanes: 6,
    direction: 'vertical',
    dragAndDrop: false,
    resizable: false,
    floating: true,
    shrink: true,
    /*
    responsiveOptions: [
      {
        breakpoint: 'sm',
        lanes: 1,
        minWidth: 0,
      }, {
        breakpoint: 'md',
        lanes: 2,
        minWidth: 768,
      }, {
        breakpoint: 'lg',
        lanes: 6,
        minWidth: 992,
      }, {
        breakpoint: 'xl',
        lanes: 8,
        minWidth: 1200,
      },
    ],
    */
  };

  constructor(private widgetsService: WidgetsService) {}

  private initGridsterConfig(): void {
    this.gridsterConfig.lanes = this.columns;
    this.gridsterConfig.dragAndDrop = this.editable && this.editing;
    this.gridsterConfig.resizable = this.editable && this.editing;
  }

  private updateGridster(): void {
    if (!this.gridster) return;
    if (this.debugging) console.debug('Updating Gridster...');
    this.gridster
      .setOption('lanes', this.columns)
      .setOption('dragAndDrop', this.editable && this.editing)
      .setOption('resizable', this.editable && this.editing)
      // .setOption('shrink', !(this.editable && this.editing))
      .reload();
  }

  public ngOnInit(): void {
    this.initGridsterConfig();
  }

  public ngAfterViewInit(): void {
    this.widgetContainers = this.containerRefs.toArray();
    this.containerRefs.changes.subscribe((r: QueryList<WidgetComponent>) => {
      this.widgetContainers = r.toArray();
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.updateGridster();
  }

  public present(): void {
    // this.viewsService.present(this.view);
  }

  public onWidgetChangeStart(event: any, index: number): void {
    if (this.debugging) console.debug('WidgetGridComponent :: start', event, index);
    this.onChangeStart.emit(event);
  }

  public onWidgetChange(event: any, index: number): void {
    if (this.debugging) console.debug('WidgetGridComponent :: change', event, index);
    this.widgetContainers[index].reflow();
    this.onChange.emit(event);
  }

  public onWidgetChangeEnd(event: any, index: number): void {
    if (this.debugging) console.debug('WidgetGridComponent :: end', event, index);
    this.onChangeEnd.emit(event);
  }

  public reflowAll(): void {
    if (this.debugging) console.debug(`>> Reflowing all Widgets in WidgetGrid`);
    this.widgetContainers.forEach((c: WidgetComponent) => c.reflow());
  }

  public refreshAll(): void {
    if (this.debugging) console.debug(`>> Refreshing all Widgets in WidgetGrid`);
    this.widgetContainers.forEach((c: WidgetComponent) => c.refresh());
  }

  public removeWidget(config: WidgetConfig): void {
    this.onRemoveWidget.emit(config);
  }

}
