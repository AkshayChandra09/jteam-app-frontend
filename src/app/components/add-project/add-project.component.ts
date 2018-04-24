import { Component, OnInit } from '@angular/core';
import {Project} from '../../project';
import {Router, RouterLink} from '@angular/router';
import { ProjectService } from '../../shared-service/project.service';
import {AuthService} from '../../shared-service/auth.service';
import {User} from '../../user';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  private project = new Project();
  currentUser:User;

  constructor(private _projectService:ProjectService, private _router:Router,private _authService:AuthService) { 

    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  projectForm(){
    if(this.project.id==undefined){
      this._projectService.addProject(this.project).subscribe((project)=>{
        this._router.navigate(['/dashboard']);
      }, (error)=>{
        console.log(error);
      });
    }else{
      alert('Project already exists!');
    }
  }

  logOut(){
    alert('Are you sure, You want to logout?');
    localStorage.removeItem('currentUser');
    this._router.navigate(['/login']);
  }

}
