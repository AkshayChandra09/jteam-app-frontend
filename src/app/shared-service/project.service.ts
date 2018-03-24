import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Dashboard } from '../dashboard';

@Injectable()
export class ProjectService {

  private baseUrl:string = 'http://localhost:8080/api';

  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});

  private dashboard:Dashboard;

  constructor(private _http:Http) { }

  getProjectList(){
    return this._http.get(this.baseUrl+'/projectList', this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  errorHandler(error:Response){
    return Observable.throw(error||"SERVER ERROR");
  }

}
