import { Component, OnInit } from '@angular/core';
import {TeamObject} from '../../team-object';
import {ProjectService } from '../../shared-service/project.service';
import {ProjectStats} from '../../project-stats';
import {Router, RouterLink} from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  project_id:Number;
  stats = new ProjectStats();

  id = 'chart1';
  width = 900;
  height = 300;
  dataFormat = 'json';

  dataSource_pie;

  type_3Dpie = 'pie3d';
  title = 'Project Satistics';
  teamObject : TeamObject[];
  
  msg:boolean=false;


  constructor(private _projectService : ProjectService, private _router:Router) {

  }

  ngOnInit() {
    this.project_id = this._projectService.getProject_id();
    this._projectService.getProjectStats(this.project_id).subscribe((stats)=>{
        this.stats = stats;

        console.log(this.stats);

      }, (error)=> {
        console.log(error);
      })
      
      this.dataSource_pie = {
        "chart": {
            "caption": "Project Progress Statistics",
            "subcaption": "Tasks Analysis",
            "startingangle": "120",
            "showlabels": "0",
            "showlegend": "1",
            "enablemultislicing": "0",
            "slicingdistance": "15",
            "showpercentvalues": "1",
            "showpercentintooltip": "0",
            "plottooltext": "$label : $datavalue",
            "theme": "ocean",
            "smartLineColor": "#ff0000"
        },
        "data": [
            {
                "label": "Completed",
                "value": this.stats.completed_tasks,
                "color": "#6baa01"
            },
            {
                "label": "In-progress",
                "value": this.stats.inprogress_tasks,
                "color": "#008ee4"
            },
            {
                "label": "Pending",
                "value": this.stats.pending_tasks,
                "color": "#ff0000"
            }
        ]
      }; 

  }

}
