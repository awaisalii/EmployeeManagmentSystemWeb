import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {
  LoginFormComponent,
  ResetPasswordFormComponent,
  CreateAccountFormComponent,
  ChangePasswordFormComponent,
} from './components';
import { AuthGuardService } from './services';

import { SideNavOuterToolbarComponent, UnauthenticatedContentComponent } from './layouts';
import { MailComponent } from './components/library/mail/mail.component';
import { NotificationsComponent } from './components/library/notifications/notifications.component';



const routes: Routes = [
  {
    path: 'auth',
    component: UnauthenticatedContentComponent,
    children: [
      {
        path: 'login',
        component: LoginFormComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordFormComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'create-account',
        component: CreateAccountFormComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'change-password/:recoveryCode',
        component: ChangePasswordFormComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: '',
    component: SideNavOuterToolbarComponent,
    children: [
      {
        path:'Employee',
        loadChildren : ()=> import('./employee/employee.module').then(m=>m.EmployeeModule),
        canActivate: [AuthGuardService],
      },
      {
        path:'Tasks',
        loadChildren:()=>import('./tasks/tasks.module').then(m=>m.TasksModule),
        canActivate: [AuthGuardService],
      },
      {
        path:'Profile',
        loadChildren: ()=>import('./profile/profile.module').then(m=>m.ProfileModule),
        canActivate: [AuthGuardService],
      },
      {
        path:'dashboard',
        loadChildren: ()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule),
        canActivate: [AuthGuardService],
      },
      {
        path:'Mail',
        component:MailComponent,
        canActivate: [AuthGuardService],
      },
      {
        path:'Notifications',
        component:NotificationsComponent
      },
      {
        path: '**',
        redirectTo: 'Tasks',
        pathMatch: 'full',
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules
    }),
    BrowserModule,
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
