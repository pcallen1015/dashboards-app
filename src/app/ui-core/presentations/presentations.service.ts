import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Presentation, PresentationEvent } from './presentation';
import { PresentationSlide } from './presentation-slide/presentation-slide';
import { Observable, Subject, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PresentationSlideComponent } from './presentation-slide/presentation-slide.component';

@Injectable()
export class PresentationsService {

  private _activePresentation: Presentation = null;
  public activePresentationChange: Subject<Presentation> = new Subject<Presentation>();

  constructor(
    private dialog: MatDialog,
  ) { }

  private setActivePresentation(pres: Presentation): Presentation {
    console.info(`Activating Presentation: ${pres ? pres.title || 'Untitled Presentation' : 'NULL'}`);
    this.activePresentationChange.next(this._activePresentation = pres);
    return this._activePresentation;
  }

  private clearActivePresentation(): void {
    this.setActivePresentation(null);
  }

  private viewSlide(slides: PresentationSlide[], index: number): Observable<PresentationEvent> {
    if (!(index >= 0 && index < slides.length)) return Observable.throw(new Error(`Invalid Slide Index ${index}`));
    let slide: PresentationSlide = slides[index];
    console.info(`Presenting Slide: ${slide.title} (${index})`);
    let dialog: MatDialogRef<PresentationSlideComponent, PresentationEvent> = this.dialog.open(PresentationSlideComponent, {
      panelClass: 'fullscreen',
      data: {
        slide: slide,
        hasNext: index < slides.length - 1,
        hasPrevious: index > 0,
      }
    });

    return dialog.afterClosed().pipe(catchError((error: Error) => {
      console.error(error);
      return of(PresentationEvent.END);
    })).pipe(mergeMap((event: PresentationEvent) => {
      switch (event) {
        // Progress to next slide
        case PresentationEvent.NEXT_SLIDE: return this.viewSlide(slides, ++index);
        // Return to previous slide
        case PresentationEvent.PREVIOUS_SLIDE: return this.viewSlide(slides, --index);
        // Restart the presentation
        case PresentationEvent.RESTART: return this.viewSlide(slides, 0);
        // (Default) Pass along the event
        default: return of(event);
      }
    }));
  }

  public present(presentation: Presentation, fromSlide: number = 0): Observable<PresentationEvent> {
    if (this.presenting) return Observable.throw(new Error('A Presentation is already in progress'));
    if (!presentation || presentation.slides.length < 1) return Observable.throw(new Error('The requested Presentation is either invalid or has no slides'));
    console.info(`Starting Presentation "${presentation.title}"`);
    this.setActivePresentation(presentation);
    return this.viewSlide(presentation.slides, fromSlide).pipe(catchError((error: Error) => {
        console.error(error);
        return of(PresentationEvent.END);
      })).pipe(map((event: PresentationEvent) => {
      switch (event) {
        case PresentationEvent.END:
          console.info(`Presentation "${presentation.title}" Complete`);
          this.clearActivePresentation();
          break;
      }
      return event;
    }));
  }

  public get presenting(): boolean { return !!this._activePresentation; }

}
