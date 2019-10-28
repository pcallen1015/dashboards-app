import { Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StarwarsService } from '../starwars.service';
import { StarwarsInfoComponent } from '../starwars-info-component';

@Component({
  selector: 'starwars-film',
  templateUrl: './film.component.html',
  styleUrls: [
    './film.component.css',
    '../starwars-content.component.css',
  ],
  providers: [{ provide: StarwarsInfoComponent, useExisting: forwardRef(() => FilmComponent) }]
})
export class FilmComponent extends StarwarsInfoComponent implements OnChanges {
  @Input() filmId: number = null;

  private _film: any = null;
  public get film(): any { return this._film; }

  constructor(private swService: StarwarsService) { super(); }

  private initData(): Observable<void> {
    this._film = null;
    return this.swService.getFilm(this.filmId)
      .pipe(map(film => this._film = film))
      .pipe(catchError((error: Error) => {
        console.error(error.message);
        this.onError.emit(error);
        return of(null);
      }));
  }

  private init(): void {
    console.debug('FILM');
    this.initData().subscribe(() => {
      this.onReady.emit(true);
    });
  }

  public ngOnChanges(changes: SimpleChanges): void { return this.init(); }

  public romanize(num: number): string {
    if (!+num) return num.toString();
    var	digits = String(+num).split('');
    var key = ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM',
          '','X','XX','XXX','XL','L','LX','LXX','LXXX','XC',
          '','I','II','III','IV','V','VI','VII','VIII','IX'];
    var roman = '';
    var i = 3;
    while (i--) roman = (key[+digits.pop() + (i * 10)] || '') + roman;
    return Array(+digits.join('') + 1).join('M') + roman;
  }

  public reflow(): void { return this.init(); }

  public refresh(): void { return this.init(); }
}
