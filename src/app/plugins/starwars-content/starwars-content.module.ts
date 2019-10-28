import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { UiCoreModule } from '../../ui-core/ui-core.module';

import { StarwarsService } from './starwars.service';
import { StarwarsContentComponent } from './starwars-content.component';
import { FilmComponent } from './film/film.component';
import { PersonComponent } from './person/person.component';
import { StarshipComponent } from './starship/starship.component';
import { CrawlComponent } from './film/crawl/crawl.component';
import { NullComponent } from './null/null.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    UiCoreModule
  ],
  declarations: [
    StarwarsContentComponent,
    FilmComponent,
    PersonComponent,
    StarshipComponent,
    CrawlComponent,
    NullComponent,
  ],
  entryComponents: [
    StarwarsContentComponent,
  ],
  exports: [
    StarwarsContentComponent,
  ],
  providers: [
    StarwarsService,
  ]
})
export class StarwarsContentModule { }
