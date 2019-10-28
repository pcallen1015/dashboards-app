import { Component, OnInit } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../users/user';
import { AuthenticationService } from '../../users/authentication.service';
import { ViewsService } from '../../views/views.service';
import { View } from '../../views/view';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {
  private _ready: boolean = false;
  public get ready(): boolean { return this._ready; }

  private _view: View;
  public get view(): View { return this._view; }

  public get user(): User { return this.authentication.activeUser; }

  constructor(
    private authentication: AuthenticationService,
    private viewsService: ViewsService,
  ) { }

  private initView(): Observable<void> {
    return this.viewsService.read(this.user.id).pipe(map((view: View) => {
      this._view = view;
    }));
  }

  private init(): void {
    this._ready = false;
    zip(
      this.initView()
    ).subscribe(() => {
      this._ready = true;
    });
  }

  public ngOnInit(): void {
    this.init();
  }

  public createView(): void {
    let viewId: string = this.user.id;
    let name: string = `${this.user.firstName}'s Home View`;
    let description: string = `Personalized Home View for ${this.user.fullName}`;
    this.viewsService.compose(this.user.id, name, description).subscribe((view: View) => {
      this._view = view;
      // TODO: put the View in editing mode
    });
  }

}
