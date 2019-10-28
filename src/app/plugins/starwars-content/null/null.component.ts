import { Component, OnInit } from '@angular/core';
import { StarwarsInfoComponent } from '../starwars-info-component';

@Component({
  selector: 'starwars-null',
  templateUrl: './null.component.html',
  styleUrls: ['./null.component.css']
})
export class NullComponent extends StarwarsInfoComponent implements OnInit {

  public ngOnInit(): void { this.onReady.emit(true); }

  public reflow(): void {}
  public refresh(): void {}

}
