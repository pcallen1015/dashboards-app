import { Component, forwardRef, OnInit } from '@angular/core';

import { ContentComponent } from '../content-component';
import { ContentType } from '../content-type';
import { ContentTheme } from '../content-theme';
import { ContentConfigOption } from '../content-config-option';
import { ContentConfigOptionType } from '../content-config-option-type';
import { ContentConfigSelectOption } from '../content-config-select-option';

@Component({
  selector: 'null-content',
  templateUrl: './null-content.component.html',
  styleUrls: ['./null-content.component.scss'],
  providers: [{ provide: ContentComponent, useExisting: forwardRef(() => NullContentComponent) }]
})
export class NullContentComponent extends ContentComponent {

  public get name(): string { return 'Null'; }
  public get description(): string { return 'A does-nothing content component'; }
  public get theme(): ContentTheme { return ContentTheme.default; }
  public get type(): ContentType { return ContentType.EMPTY; }

  public get configurationOptions(): ContentConfigOption[] {
    return [
        new ContentConfigOption(
        'text',
        'Text',
        ContentConfigOptionType.text,
        true,
        [],
        'Example text option'
      ), new ContentConfigOption(
        'number',
        'Number',
        ContentConfigOptionType.number,
        false,
        [],
        'Example number option'
      ), new ContentConfigOption(
        'boolean',
        'Boolean',
        ContentConfigOptionType.boolean,
        false,
        [],
        'Example boolean option'
      ), new ContentConfigOption(
        'select',
        'Select',
        ContentConfigOptionType.select,
        false,
        [
          new ContentConfigSelectOption('Option 1', 'option-1'),
          new ContentConfigSelectOption('Option 2', 'option-2')
        ],
        'Example select option'
      )
    ];
  }

  public reflow(): void {
    if (this.debugging) console.debug(`NullContentComponent :: reflow()`);
  };

  public refresh(): void {
    if (this.debugging) console.debug(`NullContentComponent :: refresh()`);
  };

}