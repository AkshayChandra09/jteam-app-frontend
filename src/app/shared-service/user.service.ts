import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

//import { User } from '../user';
//import {TokenParams} from '../token-params';
import {AuthService} from './auth.service';
import {User} from '../user';

@Injectable()
export class UserService {

  private user: User;

  private headers = new Headers();
  private options = new RequestOptions();

  private baseUrl:string = 'http://localhost:8080/api';

  //private headers = new Headers({'Content-Type':'application/json'});
  //private options = new RequestOptions({headers:this.headers});

  //private user:User;

  constructor(private _http:Http, private _authService:AuthService) {

    
    this.headers.append('Accept', 'application/json');
    //console.log("User in User Constru(UserService): "+ this.user);
    //var base64Credential: string = btoa( this.user.user_name+ ':' + this.user.password); 
   // this.headers.append("Authorization", "Basic " + base64Credential);
    this.headers.append('Content-Type', 'application/json');
    this.options.headers=this.headers;
   }

  /*tryLogin(user:User){
    return this._http.post(this.baseUrl+'/login', JSON.stringify(user), this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  userLogin(uname:string, pass:string){
    var login_obj = {'user_name':uname, 'password':pass};
    return this._http.post(this.baseUrl+'/login', JSON.stringify(login_obj), this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }*/

  getUsers(){
    this.user=JSON.parse(localStorage.getItem('currentUser'));
    var base64Credential: string = btoa( this.user.user_name+ ':' + this.user.password); 
    this.headers.append("Authorization", "Basic " + base64Credential);
    return this._http.get(this.baseUrl+'/getUsers', this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  getTeamMembers(pid:Number){
    this.user=JSON.parse(localStorage.getItem('currentUser'));
    var base64Credential: string = btoa( this.user.user_name+ ':' + this.user.password); 
    this.headers.append("Authorization", "Basic " + base64Credential);
    return this._http.get(this.baseUrl+'/getProjectTeam/'+pid, this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  createUser(user:User){
   // console.log("at user service = "+user);
    return this._http.post(this.baseUrl+'/register', JSON.stringify(user), this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  errorHandler(error:Response){
    return Observable.throw(error||"SERVER ERROR");
  }

}


