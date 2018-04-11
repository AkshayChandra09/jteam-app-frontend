import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from '../../shared-service/user.service';

import { User } from '../../user';
import { TokenParams } from '../../token-params';

import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user = new User();
  tokenParams: TokenParams;



  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    // this.user.username = "";
    // this.user.password = "";

  /*  const helper = new JwtHelperService();
    const myRawToken = "6accf303-d3fd-487a-b98d-7df361028c11";
    const decodedToken = helper.decodeToken(myRawToken);
    const expirationDate = helper.getTokenExpirationDate(myRawToken);
    const isExpired = helper.isTokenExpired(myRawToken);

    console.log(myRawToken+"\t"+decodedToken);*/

  }

  loginForm() {
    //this._router.navigate(['/dashboard']);
    /*this._userService.tryLogin(this.user).subscribe((user)=>{
      //console.log(user);
      this._router.navigate(['/dashboard']);
    }, (error)=>{
      console.log(error);
    });*/

    this._userService.login(this.user.user_name, this.user.password)
      .subscribe((data) => {
        this.tokenParams = data;
        this._userService.AccesToken = this.tokenParams.access_token;
        this._router.navigate(['/dashboard']);
      });
  }

  registerUser() {
    this._router.navigate(['/register']);
  }
}


