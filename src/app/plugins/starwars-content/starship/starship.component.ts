import { Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StarwarsService } from '../starwars.service';
import { StarwarsInfoComponent } from '../starwars-info-component';

@Component({
  selector: 'starwars-starship',
  templateUrl: './starship.component.html',
  styleUrls: [
    './starship.component.css',
    '../starwars-content.component.css'
  ],
  providers: [{ provide: StarwarsInfoComponent, useExisting: forwardRef(() => StarshipComponent) }]
})
export class StarshipComponent extends StarwarsInfoComponent implements OnChanges {
  @Input() starshipId: number = null;

  private _starship: any = null;
  public get starship(): any { return this._starship; }

  constructor(private starWars: StarwarsService) { super(); }

  private initData(): Observable<void> {
    this._starship = null;
    return this.starWars.getStarship(this.starshipId).pipe(catchError((error: Error) => {
      console.error(error.message);
      this.onError.emit(error);
      return of(null);
    })).pipe(map(starship => this._starship = starship));
  }

  private init(): void {
    this.initData().subscribe(() => {
      this.onReady.emit(true);
    });
  }

  public ngOnChanges(changes: SimpleChanges): void { return this.init(); }

  public reflow(): void {}

  public refresh(): void { return this.init(); }
}
