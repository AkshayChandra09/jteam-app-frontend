import { Component, OnInit } from '@angular/core';

import { TaskService } from '../../shared-service/task.service';
import { User } from '../../user'; 
import {Router, RouterLink, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-task-members',
  templateUrl: './task-members.component.html',
  styleUrls: ['./task-members.component.css']
})
export class TaskMembersComponent implements OnInit {

  private task_id:Number;
  private users:User[];

  constructor(private _taskService:TaskService, private _router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.task_id = this.route.snapshot.params.task_id;
    this._taskService.getMembers(this.task_id).subscribe((users)=>{
      console.log(users);
      this.users=users;
    },(error)=>{
      console.log(error);
    });
  }

  deleteMember(user){
    this._taskService.deleteMember(this.task_id, user.id).subscribe((users)=>{
      this._taskService.getMembers(this.task_id).subscribe((users)=>{
        console.log(users);
        this.users=users;
      },(error)=>{
        console.log(error);
      });
    },(error)=>{
      console.log(error);
    });
  }

  logOut(){
    alert('Are you sure, You want to logout?');
    localStorage.removeItem('currentUser');
    this._router.navigate(['/login']);
  }
  
}
