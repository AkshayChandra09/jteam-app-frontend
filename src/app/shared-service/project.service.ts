import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


import { Dashboard } from '../dashboard';
import { Project } from '../project';
import {TeamObject} from '../team-object';


@Injectable()
export class ProjectService {

  private baseUrl:string = 'http://localhost:8080/api';

  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});

  private dashboard:Dashboard;

  public selectedProject_id:Dashboard;

  public project_id:Number;

  constructor(private _http:Http) { }

  addProject(project:Project){
    return this._http.post(this.baseUrl+'/newProject', JSON.stringify(project), this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }


  getProjectList(){
    return this._http.get(this.baseUrl+'/showProjectsList', this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  getProjectMembers(id:Number){
    return this._http.get(this.baseUrl+'/team_members/'+id, this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  deleteProjectMember(pid:Number,uid: Number){
    return this._http.delete(this.baseUrl+'/delete_project_member/'+ pid + '/' + uid, this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  addProjectMembers(team_members:TeamObject){
    console.log(team_members);
    return this._http.post(this.baseUrl+'/addProjectMembers', JSON.stringify(team_members), this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  getStats(){
    return this._http.get(this.baseUrl+'/dashboard_statistics', this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }
  
  getProjectStats(pid:Number){
    //console.log(pid);
    return this._http.get(this.baseUrl+'/project_statistics/'+pid, this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  getMembersProject(uid:number){
    return this._http.get(this.baseUrl+'/showMembersProjectsList/'+uid, this.options).map((response:Response) => response.json()).catch(this.errorHandler);
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
  
  setProject_id(pid:Number){
    this.project_id = pid;
  }

  getProject_id(){
    return this.project_id;
  }

}
