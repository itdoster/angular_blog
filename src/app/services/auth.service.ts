import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../constants/app.settings';
import { AuthModel } from '../shared/models/auth.model';
import { User } from '../shared/interfaces/user.interface';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

  public subject = new Subject<any>();

  constructor(public http: Http) { }

  public authorize(loginModel: AuthModel) {
    return this.http.post(AppSettings.API_ENDPOINT + 'authenticate', loginModel)
      .map((response: Response) => {
        let user: User = response.json();
        this.saveLoggedUser(user);
      });
  }

  public logout(): void {
    localStorage.removeItem('user');
  }

  public saveLoggedUser(user: User): void {
    if (user && user.token) {
      localStorage.setItem('user', JSON.stringify(user));
      this.subject.next(user);
    }
  }

  public getUser(): User {
    const user: User = JSON.parse(localStorage.getItem('user'))
    return user;
  }

  public getToken(): string {
    const user = this.getUser();
    return user ? user.token : null;
  }

  public isAuthorized(): boolean {
    return this.getToken() ? true : false;
  }

  public authorizedEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  public jwt(): RequestOptions {
    let token = this.getToken();
    if (token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + token });
      return new RequestOptions({ headers: headers });
    }
  }

}

