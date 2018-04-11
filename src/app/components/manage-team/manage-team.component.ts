import { Component, OnInit } from '@angular/core';


import { Router, RouterLink } from '@angular/router';
import { User } from '../../user';
import { TeamMember } from '../../team-member';
import { UserService } from '../../shared-service/user.service';
import { TaskService } from '../../shared-service/task.service';
import { TaskObject } from '../../task-object';
import { ProjectService } from '../../shared-service/project.service';
import { TeamObject } from '../../team-object';
import { Dashboard } from '../../dashboard';


@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.css']
})
export class ManageTeamComponent implements OnInit {

  project: Dashboard;
  //private project_id:Number;

  usersArray: User[];
  users: User[];
  pid: Number;
  return_var_any: any;
  projectMembers: User[];
  team_object: TeamObject;

  constructor(private _taskService: TaskService, private _projectService: ProjectService, private _router: Router, private _userService: UserService) { }

  ngOnInit() {

    this.project = this._projectService.getSelectedProject_id();
    this.pid = this.project.id;
    //console.log("pid is: " + this.pid);

    this._userService.getUsers().subscribe((usersArray) => {
      //console.log(usersArray);
      this.usersArray = usersArray;
    }, (error) => {
      console.log(error);
    });

    this._projectService.getProjectMembers(this.pid).subscribe((users) => {
      //console.log(users);
      this.users = users;
    }, (error) => {
      console.log(error);
    });
  }

  deleteProjectMember(user_id) {
    //console.log(user_id);
    this._projectService.deleteProjectMember(this.pid, user_id).subscribe((return_var_any) => {
      //console.log(return_var_any);
      this._projectService.getProjectMembers(this.pid).subscribe((users) => {
       // console.log(users);
        this.users = users;
      }, (error) => {
        //console.log(error);
      })
    }, (error) => {
      console.log(error);
    });
  }

  newTeamMembers() {
    this.team_object = new TeamObject(this.pid, this.projectMembers);
    //console.log(this.team_object);
    this._projectService.addProjectMembers(this.team_object).subscribe((team_object) => {
      this._projectService.getProjectMembers(this.pid).subscribe((users) => {
        //console.log(users);
        this.users = users;
      }, (error) => {
        //console.log(error);
      })
    }, (error) => {
      console.log(error);
    });
  }
}
