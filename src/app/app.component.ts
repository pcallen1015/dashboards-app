import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ContentService } from './ui-core/content/content.service';
import { ContentComponent } from './ui-core/content/content-component';
import { ContentHostComponent } from './ui-core/content/content-host/content-host.component';
import { ContentConfig } from './ui-core/content/content-config';
import { NavItem } from './ui-core/utils/recursive-dropdown-menu/nav-item.interface';
import { NotificationsService } from './ui-core/notifications/notifications.service';
import { DialogsService } from './ui-core/dialogs/dialogs.service';
import { PresentationsService } from './ui-core/presentations/presentations.service';
import { Presentation, PresentationEvent } from './ui-core/presentations/presentation';
import { PresentationSlide } from './ui-core/presentations/presentation-slide/presentation-slide';
import { ContentContainer } from './ui-core/content/content-container';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChildren(ContentHostComponent) private _hostsRefs: QueryList<ContentHostComponent>;
  private _hosts: ContentHostComponent[] = [];

  public config: ContentConfig = new ContentConfig({ text: 'hello' });
  private _configs: ContentConfig[];
  public get configs(): ContentConfig[] { return this._configs; }

  public editing: boolean = false;
  public debugging: boolean = true;

  private _navItems: NavItem[] = [
    {
      label: 'Item 1',
      icon: 'home',
      action: () => {
        console.debug('hello!');
      }
    }, {
      label: 'Item 2',
      icon: 'home',
      children: [{
        label: 'Child 1'
      }, {
        label: 'Child 2',
        children: [{
          label: 'Grandchild 1',
          action: () => { alert('Click!'); }
        }]
      }]
    }
  ];
  public get navItems(): NavItem[] { return this._navItems; }

  private _sidebarOptions: any = {
    title: 'Sidebar Title',
    toolbarButtons: [
      {
        icon: 'icon-close',
        onClick: () => { this.toggleSidebar(); },
      },
      {
        icon: 'icon-help',
        onClick: () => alert('clicked the help'),
      },
      {
        icon: 'icon-warning',
        onClick: () => alert('clicked the warning'),
      },
    ],
    items: [
      {
        title: 'item 1',
        icon: 'icon-alert',
        subItems: [
          { title: 'sub-item 1', url: 'example/Sidebar' },
          { title: 'sub-item 2', url: 'example/Sidebar', icon: 'icon-at' },
        ],
      },
      { title: 'click me', onClick: () => alert('clicked') },
      { title: 'item 2', url: 'example/Sidebar' },
    ],
  };
  public get sidebarOptions(): any { return this._sidebarOptions; }

  private _sidebarVisible: boolean = false;
  public get sidebarVisible(): boolean { return this._sidebarVisible; }
  public toggleSidebar(): void { this._sidebarVisible = !this._sidebarVisible; }

  constructor(
    private content: ContentService,
    private notifications: NotificationsService,
    private dialogs: DialogsService,
    private presentations: PresentationsService
  ) {}

  public ngOnInit(): void {
    this._configs = this.content.contentComponents.map((component: ContentComponent) => {
      return new ContentConfig({
        contentComponentId: component.componentId,
        text: 'some cool text'
      });
    });
  }

  public ngAfterViewInit(): void {
    this._hosts = this._hostsRefs.toArray();
    this._hostsRefs.changes.subscribe((r: QueryList<ContentHostComponent>) => {
      this._hosts = r.toArray();
    });
  }

  public browse(): void {
    this.content.browseContentComponents().afterClosed().subscribe((selectedComponents: ContentComponent[]) => {
      console.debug(selectedComponents);
    });
  }

  public present(): void {
    let pres: Presentation = new Presentation('Demo', [
      new PresentationSlide('My Slide', new ContentConfig()),
      new PresentationSlide('My Slide 2', new ContentConfig())
    ]);
    this.presentations.present(pres).subscribe((event: PresentationEvent) => console.debug(event));
  }

  public get presenting(): boolean { return this.presentations.presenting; }

  public refresh(): void {
    this._hosts.forEach((host: ContentHostComponent) => host.refresh());
  }

  public configure(container: ContentContainer): void {
    this.content.configure(container);
  }

  public presentContainer(container: ContentContainer): void {
    let pres: Presentation = new Presentation('Component', [
      new PresentationSlide('Container', container.config)
    ]);
    this.presentations.present(pres).subscribe((event: PresentationEvent) => console.debug(event));
  }

  public snack(): void {
    let ref = this.notifications.simpleSnackBar('Some Important Info...', 'Do Something (Label)', 5000);
    ref.onAction().subscribe(() => {
      console.debug('now do something!');
    });
  }

  public info(): void {
    this.dialogs.info('My Message', 'This is an INFO message', 'Ok').onDone().subscribe(() => {
      console.debug('done');
    });
  }

  public confirm(): void {
    this.dialogs.confirm('Are you sure you want to do this?', `I'm Sure`, 'Ehhhh').onResponse().subscribe((response: boolean) => {
      console.debug(response);
    });
  }
}
