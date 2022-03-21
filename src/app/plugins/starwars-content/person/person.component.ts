import { Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StarwarsService } from '../starwars.service';
import { StarwarsInfoComponent } from '../starwars-info-component';

@Component({
  selector: 'starwars-person',
  templateUrl: './person.component.html',
  styleUrls: [
    './person.component.css',
    '../starwars-content.component.css',
  ],
  providers: [{ provide: StarwarsInfoComponent, useExisting: forwardRef(() => PersonComponent) }]
})
export class PersonComponent extends StarwarsInfoComponent implements OnChanges {
  @Input() personId: number = null;

  private _person: any = null;
  public get person(): any { return this._person; }

  constructor(private starWars: StarwarsService) { super(); }

  private initData(): Observable<void> {
    this._person = null;
    return this.starWars.getPerson(this.personId).pipe(catchError((error: Error) => {
      console.error(error.message);
      this.onError.emit(error);
      return of(null);
    })).pipe(map(person => this._person = person));
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
