import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogTitle, MAT_DIALOG_DATA } from '@angular/material';
import { PresentationEvent } from '../presentation';
import { PresentationSlide } from './presentation-slide';

@Component({
  selector: 'presentation-slide',
  templateUrl: './presentation-slide.component.html',
  styleUrls: ['./presentation-slide.component.scss']
})
export class PresentationSlideComponent implements OnInit {
  private _slide: PresentationSlide;
  private _hasNext: boolean;
  private _hasPrevious: boolean;

  constructor(
    public dialogRef: MatDialogRef<PresentationSlideComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this._slide = data.slide;
    this._hasNext = data.hasNext;
    this._hasPrevious = data.hasPrevious;
  }

  public ngOnInit(): void {

    // What for and handle certain key presses and trigger appropriate presentation behavior
    this.dialogRef.keydownEvents().subscribe((event: KeyboardEvent) => {
      switch (event.code) {
        case 'Escape':
          return this.end();
        case 'Space': case 'Enter': case 'ArrowRight':
          return this.next();
        case 'Backspace': case 'ArrowLeft':
          return this.back();
      }
    });
  }

  public get slide(): PresentationSlide { return this._slide; }
  public get hasNext(): boolean { return this._hasNext; }
  public get hasPrevious(): boolean { return this._hasPrevious; }

  public next(): void {
    if (this._hasNext) this.dialogRef.close(PresentationEvent.NEXT_SLIDE);
    else this.end();
  }

  public back(): void {
    if (this._hasPrevious) this.dialogRef.close(PresentationEvent.PREVIOUS_SLIDE);
    else this.end();
  }

  public end(): void { this.dialogRef.close(PresentationEvent.END); }

}
