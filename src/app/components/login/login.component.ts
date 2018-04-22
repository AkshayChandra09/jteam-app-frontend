import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from '../../shared-service/user.service';
import { AuthService } from '../../shared-service/auth.service';


import { User } from '../../user';
import { TokenParams } from '../../token-params';

import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  user:User = new User();
  tokenParams: TokenParams;
  username:string;
  password:string;
  user1=new User();
  errorMessage:string;

  constructor(private authService :AuthService, private _userService: UserService, private _router: Router) { }

  ngOnInit() {
  }

  login(){
    this.authService.logIn(this.user)
      .subscribe(data=>{
        this._router.navigate(['/dashboard']);
        },err=>{
        this.errorMessage="error :  Username or password is incorrect";
        }
      )
  }

  registerUser() {
    this._router.navigate(['/register']);
  }
}


