import { Component, OnInit } from '@angular/core';
import {User} from '../../user';
import {Router} from '@angular/router';
import { UserService } from '../../shared-service/user.service'; 



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user:User;
  
  constructor(private _userService:UserService, private _router:Router) { }

  ngOnInit() {
    
  }

  loginForm(){
    this._userService.tryLogin(this.user).subscribe((user)=>{
      console.log(user);
    }, (error)=>{
      console.log(error);
    });
  }

}
