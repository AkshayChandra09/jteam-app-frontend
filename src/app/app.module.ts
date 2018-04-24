import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ListtasksComponent } from './components/listtasks/listtasks.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskService } from './shared-service/task.service';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectService } from './shared-service/project.service';
import { ReportComponent } from './components/report/report.component';

import { UserService } from './shared-service/user.service';


import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';
import { LoginComponent } from './components/login/login.component';
import { TaskMembersComponent } from './components/task-members/task-members.component';
import { RegisterComponent } from './components/register/register.component';
import { ManageTeamComponent } from './components/manage-team/manage-team.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { MemberDashboardComponent } from './components/member-dashboard/member-dashboard.component';
import { MemberTasksComponent } from './components/member-tasks/member-tasks.component';
import { UrlPermission } from './urlPermission/url.permission';
import { AuthService } from './shared-service/auth.service';




FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

const appRoutes:Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[UrlPermission]}, //canActivate:[UrlPermission]
  {path:'view_tasks', component:ListtasksComponent, canActivate:[UrlPermission]},
  {path:'add_task', component:TaskFormComponent, canActivate:[UrlPermission]},
  {path:'manage_team', component:ManageTeamComponent, canActivate:[UrlPermission]},
  {path:'edit_task/:task_id', component:EditTaskComponent, canActivate:[UrlPermission]},
  {path:'statistics', component:ReportComponent, canActivate:[UrlPermission]},
  {path:'task_members/:task_id', component:TaskMembersComponent, canActivate:[UrlPermission]},
  {path:'add_project', component:AddProjectComponent, canActivate:[UrlPermission]},
  {path:'member_dashboard', component:MemberDashboardComponent, canActivate:[UrlPermission]},
  {path:'member_tasks', component:MemberTasksComponent, canActivate:[UrlPermission]},

  {path:'**', redirectTo: '/login'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListtasksComponent,
    TaskFormComponent,
    EditTaskComponent,
    DashboardComponent,
    ReportComponent,
    LoginComponent,
    TaskMembersComponent,
    RegisterComponent,
    ManageTeamComponent,
    AddProjectComponent,
    MemberDashboardComponent,
    MemberTasksComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FusionChartsModule,
  ],
  providers: [TaskService, ProjectService, UserService, UrlPermission, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  isValid: boolean = false;

}
