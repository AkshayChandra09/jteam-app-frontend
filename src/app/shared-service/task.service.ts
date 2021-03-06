import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Task } from '../task';
import { TaskObject } from '../task-object';
import {AuthService} from './auth.service';
import {User} from '../user';


@Injectable()
export class TaskService {

  user:User

  private headers = new Headers();
  private options = new RequestOptions();

  private baseUrl:string = 'http://localhost:8080/api';

  //private headers = new Headers({'Content-Type':'application/json'});
  //private options = new RequestOptions({headers:this.headers});

  private task:Task;

  public project_id:Number;

  constructor(private _http:Http, private _authService:AuthService) {
    this.user=JSON.parse(localStorage.getItem('currentUser'));
    // this.user = this._authService.getUser();
    this.headers.append('Accept', 'application/json');
    var base64Credential: string = btoa( this.user.user_name+ ':' + this.user.password); 
    this.headers.append("Authorization", "Basic " + base64Credential);
    this.headers.append('Content-Type', 'application/json');
    this.options.headers=this.headers;
    
   }

  getTasks(){
    console.log("User in getTask(TaskService): "+ this.user);
    return this._http.get(this.baseUrl+'/showTasks', this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  getTask(id:Number){
    return this._http.get(this.baseUrl+'/showTask/'+id, this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  addTasks(task:Task){
    return this._http.post(this.baseUrl+'/new_task', JSON.stringify(task), this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  addTaskWithMembers(task: TaskObject){
    //task.project_id = this.project_id;
    return this._http.post(this.baseUrl+'/add_task_with_members', JSON.stringify(task), this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  updateTask(task:Task){
    return this._http.put(this.baseUrl+'/task',JSON.stringify(task), this.options).map((response:Response)=>response.json()).catch(this.errorHandler);
  }

  deleteTask(id:Number){
    return this._http.delete(this.baseUrl+'/task/'+id,this.options).map((response:Response)=>response.json()).catch(this.errorHandler);
  }

  getMembers(id:Number){
    return this._http.get(this.baseUrl+'/showMembers/'+id, this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  deleteMember(task_id:Number, uid:Number){
    return this._http.delete(this.baseUrl+'/deleteMember/'+task_id+'/'+uid,this.options).map((response:Response)=>response.json()).catch(this.errorHandler);
  }

  getProjectTasks(){
    return this._http.get(this.baseUrl+'/showTasksInProject/'+this.project_id, this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  getMemberTasks(pid:Number, uid:Number){
    return this._http.get(this.baseUrl+'/showMemberTasks/'+pid+'/'+uid, this.options).map((response:Response) => response.json()).catch(this.errorHandler);
  }

  errorHandler(error:Response){
      return Observable.throw(error||"SERVER ERROR");
  }

  setter(task:Task){
    this.task=task;
  }

  getter(){
    return this.task;
  }

  setProject_id(pid:Number){
    this.project_id = pid;
  }

  getProject_id(){
    return this.project_id;
  }

}
