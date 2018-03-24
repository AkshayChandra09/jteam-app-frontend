import { Component, OnInit } from '@angular/core';
import {Task} from '../../task';
import {Router, ActivatedRoute} from '@angular/router';
import { TaskService } from '../../shared-service/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  private task = new Task;
  private task_id:Number; 

  status = ["Pending","In-Progress","Completed"];

  constructor(private _taskService:TaskService, private _router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    //this.task = this._taskService.getter();
    //console.log(this.route);
    this.task_id = this.route.snapshot.params.task_id;
    this._taskService.getTask(this.task_id).subscribe((task)=>{
     //console.log(task);
     this.task = task;
    }, (error)=>{
      console.log(error);
    });
  }

  editForm(){
    if(this.task.id==undefined){
      this._taskService.addTasks(this.task).subscribe((task)=>{
        this._router.navigate(['/view_tasks']);
      }, (error)=>{
        console.log(error);
      });
    }else{
      this._taskService.updateTask(this.task).subscribe((task)=>{
        console.log(task);
        this._router.navigate(['/view_tasks']);
      }, (error)=>{
        console.log(error);
      });
    }
  }

}
