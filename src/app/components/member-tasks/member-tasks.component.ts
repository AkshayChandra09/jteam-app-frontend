import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { TaskService } from '../../shared-service/task.service';
import { Task } from '../../task'; 
import { ProjectService } from '../../shared-service/project.service';


@Component({
  selector: 'app-member-tasks',
  templateUrl: './member-tasks.component.html',
  styleUrls: ['./member-tasks.component.css']
})
export class MemberTasksComponent implements OnInit {

  private tasks:Task[];
  project_id:Number;


  user_id:Number=3;
  status = ["Pending","In-Progress","Completed"];

  constructor(private _taskService:TaskService, private _projectService:ProjectService, private _router:Router) { }

  ngOnInit() {
    this.project_id = this._projectService.getProject_id();
    this._taskService.getMemberTasks(this.project_id,this.user_id).subscribe((tasks)=>{
      console.log(tasks);
      this.tasks=tasks;
    }, (error)=> {
      console.log(error);
    });

  }

  updateForm(task){
    this._taskService.updateTask(task).subscribe((task)=>{
      console.log(task);
      alert('Status Updated');
      this._taskService.getMemberTasks(this.project_id,this.user_id).subscribe((tasks)=>{
        this.tasks=tasks;
      }, (error)=> {
        console.log(error);
      });
    }, (error)=>{
      console.log(error);
    });
  }

  logOut(){
    alert('Are you sure, You want to logout?');
    localStorage.removeItem('currentUser');
    this._router.navigate(['/login']);
  }

}
