import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


import { Dashboard } from '../dashboard';

import {TeamObject} from '../team-object';


@Injectable()
export class ProjectService {

  private baseUrl:string = 'http://localhost:8080/api';

  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});

  private dashboard:Dashboard;

  public selectedProject_id:Dashboard;

  constructor(private _http:Http) { }

  getProjectList(){
    return this._http.get(this.baseUrl+'/projectList', this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  getProjectMembers(id:Number){
    return this._http.get(this.baseUrl+'/team_members/'+id, this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  deleteProjectMember(pid:Number,uid: Number){
    return this._http.delete(this.baseUrl+'/delete_project_member/'+ pid + '/' + uid, this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  addProjectMembers(team_members:TeamObject){
    return this._http.post(this.baseUrl+'/addProjectMembers', JSON.stringify(team_members), this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  getStats(){
    return this._http.get(this.baseUrl+'/statistics/', this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }
  
  setSelectedProject_id(proj:Dashboard){
    this.selectedProject_id = proj;
  }

  getSelectedProject_id(){
    return this.selectedProject_id;
  }
  
  errorHandler(error:Response){
    return Observable.throw(error||"SERVER ERROR");
  }
  

}
