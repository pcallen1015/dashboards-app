import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GRAVITY_CONFIG } from '../gravity.config';

@Injectable()
export class GravityBoardsService {

  constructor(
    private http: HttpClient,
  ) { }

  public getBoardIds(): Observable<any[]> {
    return this.http.get(`${GRAVITY_CONFIG.api_root}/board`).pipe(map((result: any) => {
      return Object.keys(result).map((key: string) => { return { id: key, name: result[key] }; });
    }));
  }

  public getBoardById(id: string): Observable<any> {
    return this.http.get(`${GRAVITY_CONFIG.api_root}/board/${id}`);
  }

}
