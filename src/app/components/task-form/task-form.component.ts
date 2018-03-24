import { Component, OnInit } from '@angular/core';
import {Task} from '../../task';
import {Router} from '@angular/router';
import { TaskService } from '../../shared-service/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  private task:Task;

  status = ["Pending","In-Progress","Completed"];
  priority = ["High", "Medium", "Low"];

  constructor(private _taskService:TaskService, private _router:Router) { }

  ngOnInit() {
    this.task = this._taskService.getter();
  }

  processForm(){
    if(this.task.id==undefined){
      this._taskService.addTasks(this.task).subscribe((task)=>{
        console.log(task);
        this._router.navigate(['/view_tasks']);
      }, (error)=>{
        console.log(error);
      });
    }else{
      this._router.navigate(['/edit_tasks']);
      /*this._taskService.updateTask(this.task).subscribe((task)=>{
        console.log(task);
        
      }, (error)=>{
        console.log(error);
      });*/
    }
  }

}
