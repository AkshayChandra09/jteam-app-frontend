import { Component, OnInit, Input, Output } from '@angular/core';
import { TaskService } from '../../shared-service/task.service';
import { Task } from '../../task'; 
import {Router, RouterLink} from '@angular/router';

import {User} from '../../user';
import { ProjectService } from '../../shared-service/project.service';

import { Dashboard } from '../../dashboard';

@Component({
  selector: 'app-listtasks',
  templateUrl: './listtasks.component.html',
  styleUrls: ['./listtasks.component.css']
})
export class ListtasksComponent implements OnInit {

  private tasks:Task[];
  private members:string[];
  private users:User[];

  project:Dashboard;

  msg:boolean = false;
  
  constructor(private _taskService:TaskService, private _projectService:ProjectService, private _router:Router) { }

  ngOnInit() {
    this.project = this._projectService.getSelectedProject_id();
    this._taskService.getProjectTasks().subscribe((tasks)=>{
      console.log(tasks);
      this.tasks=tasks;
      if(this.tasks.length==0){
        this.msg = true;
      }
    }, (error)=> {
      console.log(error);
    }) 
  }

  updateTask(task){
      this._router.navigate(['/edit_task/', task.id]);
  }
  newTask(){
    let task = new Task();
    this._taskService.setter(task);
    this._router.navigate(['/add_task']);
  }

  deleteTask(task){
      this._taskService.deleteTask(task.id).subscribe((data)=>{
        this.tasks.splice(this.tasks.indexOf(task,1));
        this._taskService.getTasks().subscribe((tasks)=>{
          this.tasks=tasks;
        }, (error)=> {
          console.log(error);
        })
      },(error)=>{
        console.log(error);
      });
  }
  
  viewMembers(task){
    this._router.navigate(['/task_members/', task.id]);
  }
}

