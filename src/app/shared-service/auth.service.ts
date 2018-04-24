import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import {User} from "../user";
import {AppComponent} from "../app.component";

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(public http: Http) { }

  save_user:User;

  public logIn(user: User){


    let headers = new Headers();
    headers.append('Accept', 'application/json')
    // creating base64 encoded String from user name and password
    var base64Credential: string = btoa( user.user_name+ ':' + user.password);
    headers.append("Authorization", "Basic " + base64Credential);

    let options = new RequestOptions();
    options.headers=headers;

    return this.http.get("http://localhost:8080/api/login" ,   options)
      .map((response: Response) => {
      // login successful if there's a jwt token in the response
      let user = response.json().principal;// the returned user object is a principal object
     
      console.log(user);
      if (user) {
        // store user details  in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.save_user=user;
      }
    });
  }

  logOut() {
    // remove user from local storage to log user out
    return this.http.post("http://localhost:8080/logout",{})
      .map((response: Response) => {
        localStorage.removeItem('currentUser');
        alert('Logged Out!');
      });
  }

  getUser(){
      return this.save_user;
  }

}
