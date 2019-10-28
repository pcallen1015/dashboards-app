import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';

@Injectable()
export class AuthenticationService {

  private _activeUser: User = null;

  constructor(
    private http: HttpClient,
  ) { }

  public login(): Observable<User> {
    console.info('Logging in...');

    // TODO: make an actual call to some authentication system
    return of({ id: 'colallen', firstname: 'Colin', surname: 'Allen', email: 'philip.colin.allen@gmail.com' }).pipe(map((data: any) => {
      this._activeUser = new User(data);
      return this._activeUser;
    }));
  }

  public get activeUser(): User { return this._activeUser; }

}
