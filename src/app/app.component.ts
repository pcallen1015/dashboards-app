import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { NavigationService } from './app-routing/navigation.service';
import { User } from './users/user';
import { AuthenticationService } from './users/authentication.service';
import { ApplicationService } from './application.service';
import { Application } from './application';
import { WorkspacesService } from './workspaces/workspaces.service';

import { ContentTheme } from './ui-core/content/content-theme';
import { DialogsService } from './ui-core/dialogs/dialogs.service';
import { NavItem } from './ui-core/utils/recursive-dropdown-menu/nav-item.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav) _sidenav: MatSidenav;

  constructor(
    private navigationService: NavigationService,
    private authenticationService: AuthenticationService,
    private applicationService: ApplicationService, 
    private workspacesService: WorkspacesService,
    private router: Router,
    private dialogs: DialogsService
  ) {}

  private _ready: boolean = false;
  public get ready(): boolean { return this._ready; }

  private _error: Error = null;
  public get error(): Error { return this._error; }

  private _application: Application;
  public get application(): Application { return this._application; }

  private _sidenavOptions: any = {
    title: null,
    toolbar: {
      buttons: [
        { icon: 'fas fa-home',  action: () => { this.router.navigateByUrl('home'); } },
        { icon: 'fas fa-cog',   action: () => this.dialogs.info('Well this is awkward...', 'This button does nothing right now', 'Oh... Ok') },
        { icon: 'fas fa-times', action: () => { this._sidenav.toggle(false); } }
      ]
    }
  };
  public get sidenavOptions(): any { return this._sidenavOptions; }

  private _localNav: NavItem;
  private _contentNav: NavItem;

  public get navs(): NavItem[] {
    return []
      .concat(this._localNav || [])
      .concat(this._contentNav || []);
  }

  private initNavs(): void {
    this._localNav = { label: 'Home', action: () => this.router.navigateByUrl('home') };
    this._contentNav = this.navigationService.primaryNav;
    this.navigationService.primaryNavChange.subscribe((nav: NavItem) => this._contentNav = nav);
  }

  private initApplication(): Observable<void> {
    // TODO: this Application ID shouldn't be hard-coded
    return this.applicationService.getApplicationById(environment.rootApplicationId).pipe(map((application: Application) => {
      this._application = application;
      this.applicationService.activateApplication(this._application);
      this.applicationService.setApplicationTitle(this._application.name);

      // setup nav
      this.initNavs();
    }));
  }

  private init(): void {
    this._ready = false;

    // TEMP: test api call
    this.applicationService.applications.subscribe((apps: Application[]) => {
      console.debug(apps);
    }, (error: Error) => {
      console.error(error.message);
    });

    this.authenticationService.login().pipe(flatMap((currentUser: User) => {
      return this.initApplication();
    })).subscribe(() => {
      setTimeout(() => { this._ready = true; }, 3000);
    });
  }

  public ngOnInit(): void {
    console.info(`Application started using "${environment.name}" configuration`);
    this.init();
    this.navigationService.activeContentPathChange.subscribe((path: string) => {
      
    });
  }

  public ngAfterViewInit(): void {
    
  }

  public get theme(): ContentTheme {
    try { return this.workspacesService.activeWorkspace.theme; }
    catch (error) { return ContentTheme.default; }
  }

  public about(): void {
    this.application.about();
  }

  public toggleSidenav(): void {
    this._sidenav.toggle();
  }

  public get user(): User { return this.authenticationService.activeUser; }
}
