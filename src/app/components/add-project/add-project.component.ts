import { Component, OnInit } from '@angular/core';
import {Project} from '../../project';
import {Router, RouterLink} from '@angular/router';
import { ProjectService } from '../../shared-service/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  private project = new Project();

  constructor(private _projectService:ProjectService, private _router:Router) { }

  ngOnInit() {
  }

  projectForm(){
    if(this.project.id==undefined){
      this._projectService.addProject(this.project).subscribe((project)=>{
        console.log(project);
        this._router.navigate(['/dashboard']);
      }, (error)=>{
        console.log(error);
      });
    }else{
      alert('Project already exists!');
    }
  }

}
