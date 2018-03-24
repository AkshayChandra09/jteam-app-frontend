import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared-service/task.service';
import { Task } from '../../task'; 
import {Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-listtasks',
  templateUrl: './listtasks.component.html',
  styleUrls: ['./listtasks.component.css']
})
export class ListtasksComponent implements OnInit {

  private tasks:Task[];
  private members:string[];

  constructor(private _taskService:TaskService, private _router:Router) { }

  ngOnInit() {
    this._taskService.getTasks().subscribe((tasks)=>{
      console.log(tasks);
      this.tasks=tasks;
    }, (error)=> {
      console.log(error);
    })
  }

  updateTask(task){
      //this._taskService.setter(task);
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
      },(error)=>{
        console.log(error);
      });
  }
  
  viewMembers(task){
    this._taskService.getMembers(task.id).subscribe((members)=>{
      console.log(members);
    },(error)=>{
      console.log(error);
    });
  }
}

