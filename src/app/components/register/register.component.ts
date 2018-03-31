import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { Router } from '@angular/router';
import { UserService } from '../../shared-service/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private user = new User();
  role = ["Admin", "TeamMemeber"];
  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
  }

  userRegisterForm() {

    if(this.user.password == this.user.confirm_password){
      this._userService.createUser(this.user).subscribe((user) => {
        this._router.navigate(['/']);
      }, (error) => {
        console.log(error);
      });
      //console.log("pwd sucess");
    }
    else{
      console.log("password confirm error");
    }

  }

}
