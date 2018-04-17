import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared-service/project.service';
import { Dashboard } from '../../dashboard';
import { Router, RouterLink } from '@angular/router';

import { UserService } from '../../shared-service/user.service';
import { TaskService } from '../../shared-service/task.service';


@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent implements OnInit {

  private dashboard: Dashboard;
  uid:number=3;

  constructor(private _projectService: ProjectService, private _userService: UserService, private _router: Router,
    private _taskService: TaskService) { }

  ngOnInit() {

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

}
