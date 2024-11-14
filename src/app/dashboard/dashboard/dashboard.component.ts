import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Contact } from 'src/app/types/contact';
import { Messages } from 'src/app/types/messages';
import { Opportunities } from 'src/app/types/opportunities';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  contactId = 12;

  contactData: Contact;

  contactNotes: any;

  contactMessages: Messages;

  activeOpportunities: Opportunities;

  closedOpportunities: Opportunities;

  contactName = 'Loading...';

  isLoading = false;

  employeeId:string;

  constructor(private employeeService:EmployeeService,private router:Router,private AuthService:AuthService) {
  }

  ngOnInit(): void {
    this.employeeId=this.AuthService._user.id;
    this.loadData();
  }

  loadData = () => {
    // const segments = this.router.url.split('/');
    // const overviewIndex = segments.indexOf('overview');
    // this.employeeId =segments[overviewIndex + 1];
    this.isLoading=true;
    this.employeeService.getEmployeeProfile().subscribe(
      response=>{
          if(response.status=="1"){
          response.status="Employee"
        }else{
          if(response.status=="2"){
            response.status="Trainee"
          }else{
            response.status="Intern"
          }
        }

        this.contactData=response;
        this.contactNotes=response.notes;
        this.isLoading=false
      }
    )
  };

  refresh = () => {
    this.isLoading = true;
    this.loadData();
  };
}
