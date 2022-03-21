import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  DoCheck,
} from '@angular/core';

import { ContentComponent } from '../content-component';
import { ContentHostDirective } from './content-host.directive';
import { ContentService } from '../content.service';
import { ContentConfigOption } from '../content-config-option';
import { ContentContainer } from '../content-container';
import { ContentType } from '../content-type';

@Component({
  selector: 'content-host',
  templateUrl: './content-host.component.html',
  styleUrls: ['./content-host.component.css']
})
export class ContentHostComponent extends ContentContainer implements OnInit, DoCheck {
  @ViewChild(ContentHostDirective) private _contentHost: ContentHostDirective;
  private _content: ContentComponent;

  constructor(
    private contentService: ContentService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { super(); }

  private propogate(): void {
    if (!this._content) return;
    this._content.config = this.config;
    this._content.editing = this.editing;
    this._content.debugging = this.debugging;
  }

  private init(): void {
    if (this.debugging) console.debug('ContentHostComponent :: init()');
    if (!this.config.hasParam('contentComponentId')) console.warn(`ContentHostComponent :: Provided config has no property 'contentComponentId'`);

    // Clear the container
    this._contentHost.viewContainerRef.clear();

    // Instantiate the child content body
    let comp: ContentComponent = this.contentService.getContentComponentById(this.config.getParam('contentComponentId'));
    let factory = this.componentFactoryResolver.resolveComponentFactory(comp.class);
    this._content = <ContentComponent>this._contentHost.viewContainerRef.createComponent(factory).instance;

    /**
     * After finding a ContentComponent, sync the 'contentComponentId' property of the config.
     * This will ensure that invalid values of 'contentComponentId' get set to something valid.
     */
    this.config.setParam('contentComponentId', this._content.componentId);

    // Propogate 
    this.propogate();
  }

  public ngOnInit(): void { return this.init(); }

  public ngDoCheck(): void {
    // Check if the ContentComponent specified in the config has changed and re-initialize as needed
    if (this.config 
      && this.config.hasParam('contentComponentId') 
      && (!this._content || (this.config.getParam('contentComponentId') !== this._content.componentId))) {
        return this.init();
    }
    // If child content exists, propogate all property changes
    else if (this._content) this.propogate();
    else if (this.debugging) console.debug(`ContentHostComponent :: Cannot propogate properties to content that hasn't been initialized`);
  }

  public get type(): ContentType {
    if (this.debugging) console.debug(`ContentHostComponent :: type()`);
    try { return this._content.type; }
    catch (error) {
      if (this.debugging) console.warn(`ContentHostComponent :: Can't retrieve property type from content that hasn't been initialized`);
      return ContentType.CONTAINER;
    }
  }

  public get configurationOptions(): ContentConfigOption[] {
    if (this.debugging) console.debug(`ContentHostComponent :: configurationOptions()`);
    try { return this._content.configurationOptions; }
    catch (error) {
      if (this.debugging) console.warn(`ContentHostComponent :: Can't retrieve property configurationOptions from content that hasn't been initialized`);
      return [];
    }
  }

  public reflow(): void {
    if (this.debugging) console.debug(`ContentHostComponent :: reflow()`);
    if (this._content) this._content.reflow();
    else {
      if (this.debugging) console.warn(`ContentHostComponent :: Can't reflow content that hasn't been initalized`);
    }
  }
  public refresh(): void {
    if (this.debugging) console.debug(`ContentHostComponent :: refresh()`);
    if (this._content) this._content.refresh();
    else {
      if (this.debugging) console.warn(`ContentHostComponent :: Can't refresh content that hasn't been initalized`);
    }
  }

}
