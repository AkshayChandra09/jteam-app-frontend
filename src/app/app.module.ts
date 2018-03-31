import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ListtasksComponent } from './components/listtasks/listtasks.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskService } from './shared-service/task.service';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
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




FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

const appRoutes:Routes = [
  {path:'', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'view_tasks', component:ListtasksComponent},
  {path:'add_task', component:TaskFormComponent},
  {path:'manage_team', component:ManageTeamComponent},
  {path:'edit_task/:task_id', component:EditTaskComponent},
  {path:'statistics', component:ReportComponent},
  {path:'task_members/:task_id', component:TaskMembersComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ListtasksComponent,
    TaskFormComponent,
    AdminPanelComponent,
    EditTaskComponent,
    DashboardComponent,
    ReportComponent,
    LoginComponent,
    TaskMembersComponent,
    RegisterComponent,
    ManageTeamComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FusionChartsModule,
  ],
  providers: [TaskService, ProjectService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  isValid: boolean = false;

}
