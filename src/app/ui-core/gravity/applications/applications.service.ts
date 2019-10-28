import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { GRAVITY_CONFIG } from '../gravity.config';

@Injectable()
export class GravityApplicationsService {

  constructor(
    private http: HttpClient,
  ) { }

  public getApplicationIds(): Observable<any[]> {
    return this.http.get(`${GRAVITY_CONFIG.api_root}/app`).pipe(map((result: any) => {
      return Object.keys(result).map((key: string) => { return { id: key, name: result[key] }; })
    }));
  }

  public getApplicationById(id: string): Observable<any> {
    return this.http.get(`${GRAVITY_CONFIG.api_root}/app/${id}`);
  }

}
