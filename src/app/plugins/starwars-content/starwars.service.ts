import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const CONFIG = {
  SWAPI_ROOT: 'https://swapi.co/api',
};

@Injectable()
export class StarwarsService {
  constructor(private http: HttpClient) { }

  public getFilm(id: number): Observable<any> {
    if (!id) return Observable.throw(new Error(`A Film ID is required!`));
    return this.http.get(`${CONFIG.SWAPI_ROOT}/films/${id}`).pipe(catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 404:
          return Observable.throw(new Error(`Film with ID ${id} could not be found`));
        default:
          return Observable.throw(new Error(`Failed to retrieve Film with ID ${id}`));
      }
    }));
  }

  public getPerson(id: number): Observable<any> {
    if (!id) return Observable.throw(new Error(`A Person ID is required!`));
    return this.http.get(`${CONFIG.SWAPI_ROOT}/people/${id}`).pipe(catchError((error: HttpErrorResponse) => {
      switch(error.status) {
        case 404:
          return Observable.throw(new Error(`Person with ID ${id} could not be found`));
        default:
          return Observable.throw(new Error(`Failed to retrieve Person with ID ${id}`));
      }
    }));
  }

  public getStarship(id: number): Observable<any> {
    if (!id) return Observable.throw(new Error(`A Starship ID is required!`));
    return this.http.get(`${CONFIG.SWAPI_ROOT}/starships/${id}`).pipe(catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 404:
          return Observable.throw(new Error(`Starship with ID ${id} could not be found`));
        default:
          return Observable.throw(new Error(`Failed to retrieve Starship with ID ${id}`));
      }
    }));
  }
}
