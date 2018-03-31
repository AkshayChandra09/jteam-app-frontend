import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from '../user';

@Injectable()
export class UserService {

  private baseUrl:string = 'http://localhost:8080/api';

  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});

  private user:User;

  constructor(private _http:Http) { }

  tryLogin(user:User){
    return this._http.post(this.baseUrl+'/login', JSON.stringify(user), this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  getUsers(){
    return this._http.get(this.baseUrl+'/getUsers', this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  createUser(user:User){
    console.log(user);
    return this._http.post(this.baseUrl+'/form', JSON.stringify(user), this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  errorHandler(error:Response){
    return Observable.throw(error||"SERVER ERROR");
  }

}


