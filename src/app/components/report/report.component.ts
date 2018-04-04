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
  width = 600;
  height = 400;
  dataFormat = 'json';
  dataSource;
  dataSource_pie;
  dataSource_mscombi2d;
  type_bar = 'column2d';
  type_3Dpie = 'pie3d';
  type_mscombi = 'mscombi2d';
  title = 'Project Satistics';
  teamObject : TeamObject[];
  

  constructor(private _projectService : ProjectService) {
   /* this.dataSource = {
      "chart": {
        "caption": "JTeam human/hr calculation",
        "subCaption": "Top stores in last month by revenue",
        "numberprefix": "$",
        "theme": "fint"
      },
      "data":[ ]
    }*/

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

    this.dataSource_mscombi2d = {
      "chart": {
          "caption": "Actual Revenues, Targeted Revenues & Profits",
          "subcaption": "Last year",
          "xaxisname": "Month",
          "yaxisname": "Amount (In USD)",
          "numberprefix": "$",
          "theme": "ocean"
      },
      "categories": [
          {
              "category": [
                  {
                      "label": "Jan"
                  },
                  {
                      "label": "Feb"
                  },
                  {
                      "label": "Mar"
                  },
                  {
                      "label": "Apr"
                  },
                  {
                      "label": "May"
                  },
                  {
                      "label": "Jun"
                  },
                  {
                      "label": "Jul"
                  },
                  {
                      "label": "Aug"
                  },
                  {
                      "label": "Sep"
                  },
                  {
                      "label": "Oct"
                  },
                  {
                      "label": "Nov"
                  },
                  {
                      "label": "Dec"
                  }
              ]
          }
      ],
      "dataset": [
          {
              "seriesname": "Actual Revenue",
              "data": [
                  {
                      "value": "16000"
                  },
                  {
                      "value": "20000"
                  },
                  {
                      "value": "18000"
                  },
                  {
                      "value": "19000"
                  },
                  {
                      "value": "15000"
                  },
                  {
                      "value": "21000"
                  },
                  {
                      "value": "16000"
                  },
                  {
                      "value": "20000"
                  },
                  {
                      "value": "17000"
                  },
                  {
                      "value": "25000"
                  },
                  {
                      "value": "19000"
                  },
                  {
                      "value": "23000"
                  }
              ]
          },
          {
              "seriesname": "Projected Revenue",
              "renderas": "line",
              "showvalues": "0",
              "data": [
                  {
                      "value": "15000"
                  },
                  {
                      "value": "16000"
                  },
                  {
                      "value": "17000"
                  },
                  {
                      "value": "18000"
                  },
                  {
                      "value": "19000"
                  },
                  {
                      "value": "19000"
                  },
                  {
                      "value": "19000"
                  },
                  {
                      "value": "19000"
                  },
                  {
                      "value": "20000"
                  },
                  {
                      "value": "21000"
                  },
                  {
                      "value": "22000"
                  },
                  {
                      "value": "23000"
                  }
              ]
          },
          {
              "seriesname": "Profit",
              "renderas": "area",
              "showvalues": "0",
              "data": [
                  {
                      "value": "4000"
                  },
                  {
                      "value": "5000"
                  },
                  {
                      "value": "3000"
                  },
                  {
                      "value": "4000"
                  },
                  {
                      "value": "1000"
                  },
                  {
                      "value": "7000"
                  },
                  {
                      "value": "1000"
                  },
                  {
                      "value": "4000"
                  },
                  {
                      "value": "1000"
                  },
                  {
                      "value": "8000"
                  },
                  {
                      "value": "2000"
                  },
                  {
                      "value": "7000"
                  }
              ]
          }
      ]
  };
  
  }

  ngOnInit() {

    let chartData=[];
    let chartObj:{
      label:string,
      value:Number
    };

    this._projectService.getStats().subscribe((teamObject)=>{
      console.log(teamObject);
      this.teamObject=teamObject;

      for(var i=0;i<teamObject.length;i++){
        chartObj={
          label:this.teamObject[i].project_name,
          value:this.teamObject[i].numberOfMembers
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
        "data":chartData
      }
    }, (error)=> {
      console.log(error);
    });

  }

}
