import { Component, Input, OnInit } from '@angular/core';

import { Workspace } from '../workspace';

@Component({
  selector: 'workspace-card',
  templateUrl: './workspace-card.component.html',
  styleUrls: ['./workspace-card.component.css'],
  host: {
    'style': 'height: 100%; width: 100%;'
  }
})
export class WorkspaceCardComponent implements OnInit {
  @Input() workspace: Workspace;
  public ready: boolean = false;

  constructor() { }

  private init(): void {
    this.ready = true;
  }

  ngOnInit() {
    return this.init();
  }

}
