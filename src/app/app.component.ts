import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { UrlPermission } from './urlPermission/url.permission';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _router:Router) { }
  title = 'app';
  static API_URL = "http://localhost:8080/api";
}
