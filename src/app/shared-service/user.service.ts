import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from '../user';
import {TokenParams} from '../token-params';


@Injectable()
export class UserService {

  private baseUrl:string = 'http://localhost:8080/api';

  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});

  private user:User;

  AccesToken:string="";
  private login_api = 'http://localhost:5000/login';

  constructor(private _http:Http) { }

  tryLogin(user:User){
    return this._http.post(this.baseUrl+'/login', JSON.stringify(user), this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  userLogin(uname:string, pass:string){
    var login_obj = {'user_name':uname, 'password':pass};
    return this._http.post(this.baseUrl+'/login', JSON.stringify(login_obj), this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  getUsers(){
    return this._http.get(this.baseUrl+'/getUsers', this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  createUser(user:User){
    console.log(user);
    return this._http.post(this.baseUrl+'/register', JSON.stringify(user), this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  //for authentication using pyjwt
  login(username:string, password:string): Observable<TokenParams>{
   // var data = "username="+username+"&password="+password;
    var login_obj = {'username':username, 'password':password};
    return this._http.post(this.login_api,JSON.stringify(login_obj),this.options).map(res=>res.json());
  }

  errorHandler(error:Response){
    return Observable.throw(error||"SERVER ERROR");
  }

}


