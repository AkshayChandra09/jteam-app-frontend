import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import { UserService } from '../../shared-service/user.service'; 

import { User } from '../../user';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user= new User();
  
  constructor(private _userService:UserService, private _router:Router) { }

  ngOnInit() {
   // this.user.username = "";
   // this.user.password = "";
  }

  loginForm(){
    this._userService.tryLogin(this.user).subscribe((user)=>{
      //console.log(user);
      this._router.navigate(['/']);
    }, (error)=>{
      console.log(error);
    });
  }

}


