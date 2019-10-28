import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'util-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent {
  @Input() type: string;
  @Input() message: string;

  constructor() { }

}
