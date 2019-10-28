import { Component, forwardRef, OnInit } from '@angular/core';
import { ContentComponent } from '../../ui-core/content/content-component';
import { ContentConfigOption } from '../../ui-core/content/content-config-option';
import { ContentType } from '../../ui-core/content/content-type';
import { ContentTheme } from '../../ui-core/content/content-theme';
import { ContentConfigOptionType } from '../../ui-core/content/content-config-option-type';

@Component({
  selector: 'content-message',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.css'],
  providers: [{ provide: ContentComponent, useExisting: forwardRef(() => MessageContentComponent) }]
})
export class MessageContentComponent extends ContentComponent {

  public get message(): string { return this.config.getParam('message'); }

  public get name(): string { return 'Message'; }
  public get description(): string { return 'Displays a configurable message'; }
  public get type(): ContentType { return ContentType.NOTIFICATION; }
  public get theme(): ContentTheme { return ContentTheme.default; }

  public get configurationOptions(): ContentConfigOption[] {
    return [
      new ContentConfigOption(
        'message',
        'Message',
        ContentConfigOptionType.text,
        false,
        [],
        'The message to display in the widget'
      )
    ];
  }

  public reflow(): void {
    if (this.debugging) console.debug(`${this.componentName} :: reflow()`);
  };
  public refresh(): void {
    if (this.debugging) console.debug(`${this.componentName} :: refresh()`);
  }
}