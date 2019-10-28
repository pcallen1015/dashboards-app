import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ContentComponent } from './content-component';
import { NullContentComponent } from './null-content/null-content.component';
import { BrowseContentComponentsDialogComponent } from './browse-content-components-dialog/browse-content-components-dialog.component';
import { ContentContainer } from './content-container';
import { ConfigureContentContainerDialogComponent } from './configure-content-container-dialog/configure-content-container-dialog.component';
import { ContentConfig } from './content-config';

@Injectable()
export class ContentService {

  private _contentComponents: ContentComponent[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private dialog: MatDialog,
  ) { }

  public loadContentComponents(): ContentComponent[] {
    console.info(`Loading Content Components...`);
    this._contentComponents = Array.from(this.componentFactoryResolver['_factories'].keys())
      .filter((factory: any) => factory.prototype instanceof ContentComponent)
      .map((factory: any) => factory.prototype);
    return this._contentComponents;
  }

  public get contentComponents(): ContentComponent[] {
    if (this._contentComponents.length === 0) {
      console.warn('Whoops... It looks like you forgot to load the Content Components. Loading them now...');
      return this.loadContentComponents();
    }
    return this._contentComponents;
  }

  public getContentComponentById(id: string): ContentComponent {
    let found: ContentComponent = this.contentComponents.find(comp => comp.componentName === id);
    if (!found) {
      console.warn(`Content Component with ID "${id}" was not found, substituting a default Content Component`);
      found = NullContentComponent.prototype;
    }
    return found;
  }

  public browseContentComponents(): MatDialogRef<BrowseContentComponentsDialogComponent, ContentComponent[]> {
    return this.dialog.open(BrowseContentComponentsDialogComponent, {
      width: '500px',
      data: {
        components: this.contentComponents
      }
    });
  }

  public configure(container: ContentContainer): MatDialogRef<ConfigureContentContainerDialogComponent, ContentConfig> {
    let dialogRef = this.dialog.open(ConfigureContentContainerDialogComponent, {
      width: '500px',
      data: {
        config: container.config,
        options: container.configurationOptions
      }
    });

    dialogRef.afterClosed().subscribe((updatedConfig: ContentConfig) => {
      if (updatedConfig) {
        // Update the container's config
        container.config = updatedConfig;

        // Refresh the container
        container.refresh();
      }
    });

    return dialogRef;
  }

}
