import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { MailComponent } from '../components/library/mail/mail.component';

const routes: Routes = [
  {
    path:'',
    component:EmployeeComponent
  },{
    path:'overview/:id',
    component:EmployeeDetailsComponent,
  },{
    path:'mail/:id',
    component:MailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
