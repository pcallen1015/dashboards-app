import { Component, forwardRef, ViewChild, OnInit } from '@angular/core';
import { StarwarsService } from './starwars.service';
import { StarwarsInfoComponent} from './starwars-info-component';
import { ContentComponent } from '../../ui-core/content/content-component';
import { ContentConfigOption } from '../../ui-core/content/content-config-option';
import { ContentConfigSelectOption } from '../../ui-core/content/content-config-select-option';
import { ContentType } from '../../ui-core/content/content-type';
import { ContentConfigOptionType } from '../../ui-core/content/content-config-option-type';
import { ContentTheme } from '../../ui-core/content/content-theme';

@Component({
  selector: 'content-starwars',
  templateUrl: './starwars-content.component.html',
  styleUrls: ['./starwars-content.component.css'],
  providers: [{ provide: ContentComponent, useExisting: forwardRef(() => StarwarsContentComponent) }]
})
export class StarwarsContentComponent extends ContentComponent {
  @ViewChild(StarwarsInfoComponent) private _child: StarwarsInfoComponent;
  
  public get name(): string { return 'Star Wars Info'; }
  public get description(): string { return 'Displays information about various elements of the Star Wars universe'; }
  public get type(): ContentType { return ContentType.CUSTOM; }
  public get theme(): ContentTheme { return ContentTheme.default; }

  public get configurationOptions(): ContentConfigOption[] {
    return [
      new ContentConfigOption(
        'type', 
        'Data Type', 
        ContentConfigOptionType.select,
        true,
        [
          new ContentConfigSelectOption('Films', 'films'),
          new ContentConfigSelectOption('People', 'people'),
          new ContentConfigSelectOption('Starships', 'starships'),
        ], 
        'The type of data you want to display',
      ),
      new ContentConfigOption(
        'id', 
        'Object ID', 
        ContentConfigOptionType.number,
        true,
        [],
        'The specific thing you want to display',
      )
    ];
  }
  
  public reflow(): void {
    if (this.debugging) console.debug(`${this.componentName} :: reflow()`);
    if (this._child) return this._child.reflow();
  }

  public refresh(): void {
    if (this.debugging) console.debug(`${this.componentName} :: refresh()`);
    if (this._child) return this._child.refresh();
  }

  public get mode(): string { return this.config.getParam('type'); }
  public get itemId(): string { return this.config.getParam('id'); }
}