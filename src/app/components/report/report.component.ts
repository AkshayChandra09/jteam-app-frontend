import { Component, OnInit } from '@angular/core';
import {TeamObject} from '../../team-object';
import {ProjectService } from '../../shared-service/project.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  id = 'chart1';
  width = 900;
  height = 300;
  dataFormat = 'json';

  dataSource_pie;

  type_3Dpie = 'pie3d';
  title = 'Project Satistics';
  teamObject : TeamObject[];
  
  msg:boolean=false;

  constructor(private _projectService : ProjectService) {


    this.dataSource_pie = {
      "chart": {
          "caption": "Project Progress Statistics 2",
          "subcaption": "JTeam Project",
          "startingangle": "120",
          "showlabels": "0",
          "showlegend": "1",
          "enablemultislicing": "0",
          "slicingdistance": "15",
          "showpercentvalues": "1",
          "showpercentintooltip": "0",
          "plottooltext": "Age group : $label Total visit : $datavalue",
          "theme": "ocean"
      },
      "data": [
          {
              "label": "Completed",
              "value": "1250400"
          },
          {
              "label": "In-progress",
              "value": "1463300"
          },
          {
              "label": "Pending",
              "value": "1050700"
          }
      ]
    }; 
  }

  ngOnInit() {

  }

}
