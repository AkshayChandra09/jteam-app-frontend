import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared-service/project.service';
import { Dashboard } from '../../dashboard';
import { Router, RouterLink } from '@angular/router';

import { UserService } from '../../shared-service/user.service';
import { TaskService } from '../../shared-service/task.service';
import {AuthService} from '../../shared-service/auth.service';
import {User} from '../../user';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent implements OnInit {

  private dashboard: Dashboard;
  user:User;
  uid:Number;

  constructor(private _projectService: ProjectService, private _userService: UserService, private _router: Router,
    private _taskService: TaskService, private _authService:AuthService) {
      this.user=JSON.parse(localStorage.getItem('currentUser'));
      this.uid = this.user.id;
     }

  ngOnInit() {
    //this.uid=JSON.parse(localStorage.getItem('currentUser'));
    this._projectService.getMembersProject(this.uid).subscribe((dashboard) => {
      this.dashboard = dashboard;
    }, (error) => {
      console.log(error);
    });

  }

  selectedProject(proj){ 
     this._projectService.setProject_id(proj.project_id);
     this._taskService.setProject_id(proj.project_id);
     this._router.navigate(['/member_tasks']);
  }

  logOut(){
    alert('Are you sure, You want to logout?');
    localStorage.removeItem('currentUser');
    this._router.navigate(['/login']);
  }
  
}
