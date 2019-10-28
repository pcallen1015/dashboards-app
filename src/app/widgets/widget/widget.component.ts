import { 
  Component, 
  ViewChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { ContentService } from '../../ui-core/content/content.service';
import { ContentConfigOption } from '../../ui-core/content/content-config-option';
import { ContentHostComponent } from '../../ui-core/content/content-host/content-host.component';
import { ContentContainer } from '../../ui-core/content/content-container';
import { ContentConfigOptionType } from '../../ui-core/content/content-config-option-type';
import { ContentType } from '../../ui-core/content/content-type';

import { WidgetConfig } from '../widget-config';

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent extends ContentContainer {
  @ViewChild(ContentHostComponent) private _contentHost: ContentHostComponent;
  @Input() config: WidgetConfig = new WidgetConfig();
  @Output() onChangeStart: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChange: EventEmitter<WidgetConfig> = new EventEmitter<WidgetConfig>();
  @Output() onChangeEnd: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemove: EventEmitter<WidgetComponent> = new EventEmitter<WidgetComponent>();
  
  constructor(
    private contentService: ContentService
  ) { super(); }

  public get type(): ContentType { return this._contentHost.type; }

  public get configurationOptions(): ContentConfigOption[] {
    // TODO: modify WidgetConfig class to align with Content Config, OR, augment this options using the widget config
    return [
      new ContentConfigOption('title', 'Widget Title', ContentConfigOptionType.text),
      new ContentConfigOption('showHeader', 'Show Header', ContentConfigOptionType.boolean),
      new ContentConfigOption('showFooter', 'Show Footer', ContentConfigOptionType.boolean)
    ].concat(this._contentHost.configurationOptions);
  }

  public refresh(): void {
    if (this.debugging) console.debug(`WidgetComponent :: refresh()`);
    if (this._contentHost) this._contentHost.refresh();
  }

  public reflow(): void {
    if (this.debugging) console.debug(`WidgetComponent :: reflow()`);
    if (this._contentHost) this._contentHost.reflow();
  }

  public configure(): void {
    if (this.debugging) console.debug(`WidgetComponent :: configure()`);
    this.onChangeStart.emit()
    this.contentService.configure(this).afterClosed().subscribe((config: WidgetConfig) => {
      if (config) this.onChange.emit(config);
      this.onChangeEnd.emit();
    });
  }

  public remove(): void {
    this.onRemove.emit(this);
  }

}
