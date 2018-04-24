import { Component, OnInit, Input, AUTO_STYLE } from '@angular/core';
import { ProjectService } from '../../shared-service/project.service';
import { Dashboard } from '../../dashboard';
import { Router, RouterLink } from '@angular/router';

import { UserService } from '../../shared-service/user.service';
import { TaskService } from '../../shared-service/task.service';
import {AuthService} from '../../shared-service/auth.service';

import { TeamObject } from '../../team-object';
import {User} from '../../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dashboard: Dashboard;
  project_id: Number;
  displaytoken: string;

  id = 'chart1';
  width = 900;
  height = 250;
  dataFormat = 'json';
  dataSource;
  type_bar = 'column2d';
  title = 'Project Satistics';
  teamObject: TeamObject[];
  currentUser:User;

  constructor(private _projectService: ProjectService, private _userService: UserService, private _router: Router,
    private _taskService: TaskService, private _authService:AuthService) { 

      this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    }

  ngOnInit() {
    // this.displaytoken = this._userService.AccesToken;

    this._projectService.getProjectList().subscribe((dashboard) => {
      console.log(dashboard);
      this.dashboard = dashboard;
    }, (error) => {
      console.log(error);
    });

    //for charts
    let chartData = [];
    let chartObj: {
      label: string,
      value: Number
    };

    this._projectService.getStats().subscribe((teamObject) => {
      console.log(teamObject);
      this.teamObject = teamObject;

      for (var i = 0; i < teamObject.length; i++) {
        chartObj = {
          label: this.teamObject[i].project_name,
          value: this.teamObject[i].numberOfMembers
        };
        chartData.push(chartObj);
      }

      this.dataSource = {
        "chart": {
          "caption": "Financial Statistics per project",
          "subCaption": "man/hr calculations per project",
          "numberprefix": "$",
          "theme": "fint"
        },
        "data": chartData
      }
    }, (error) => {
      console.log(error);
    });
  }

  selectedProject(proj) {
    //console.log(this.project_id); 
    this._projectService.setSelectedProject_id(proj); //delete this one
    
    this._projectService.setProject_id(proj.id);
    this._taskService.setProject_id(proj.id);
    this._router.navigate(['/view_tasks']);
  }

  newProject() {
    this._router.navigate(['/add_project']);
  }

  logOut(){
    alert('Are you sure, You want to logout?');
    localStorage.removeItem('currentUser');
    this._router.navigate(['/login']);
  }

}
