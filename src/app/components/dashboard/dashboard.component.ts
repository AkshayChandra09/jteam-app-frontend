import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared-service/project.service';
import { Dashboard } from '../../dashboard'; 
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dashboard:Dashboard;

  constructor(private _projectService:ProjectService, private _router:Router) { }

  ngOnInit() {
    this._projectService.getProjectList().subscribe((dashboard)=>{
      //console.log(dashboard);
      this.dashboard = dashboard;
    }, (error)=>{
      console.log(error);
    });
  }

}
