import { Component, OnInit } from '@angular/core';
import {Task} from '../../task';
import {Router, RouterLink} from '@angular/router';
import { TaskService } from '../../shared-service/task.service';
import {User} from '../../user'; 
import {TeamMember} from '../../team-member';
import {UserService} from '../../shared-service/user.service';

import {TaskObject} from '../../task-object';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  private task = new Task();
  teamMembers: User[];
  usersArray:User[];
  task_object:TaskObject;

  status = ["Pending","In-Progress","Completed"];
  priority = ["High", "Medium", "Low"];

  constructor(private _taskService:TaskService, private _router:Router, private _userService:UserService) { }

  ngOnInit() {
    this._userService.getUsers().subscribe((usersArray)=>{
      console.log(usersArray);
      this.usersArray=usersArray;
    }, (error)=> {
      console.log(error);
    });
  }

  processForm(){
    
    if(this.task.id==undefined){
      this.task_object = new TaskObject(this.task, this.teamMembers);
      
      this._taskService.addTaskWithMembers(this.task_object).subscribe((task_object)=>{
        console.log(task_object);
        this._router.navigate(['/view_tasks']);
      }, (error)=>{
        console.log(error);
      });

      /*this._taskService.addTasks(this.task).subscribe((task)=>{
        console.log(task);
        this._router.navigate(['/view_tasks']);
      }, (error)=>{
        console.log(error);
      });*/
    } 
    else{
      this._router.navigate(['/edit_tasks']);
    }
  }

}
