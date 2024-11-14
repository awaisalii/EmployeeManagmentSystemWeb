import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Contact } from 'src/app/types/contact';
import { Messages } from 'src/app/types/messages';
import { Notes } from 'src/app/types/notes';
import { Opportunities } from 'src/app/types/opportunities';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent {
  contactId = 12;

  contactData: Contact;

  contactNotes: any;

  contactMessages: Messages;

  activeOpportunities: Opportunities;

  closedOpportunities: Opportunities;

  contactName = 'Loading...';

  isLoading = false;
  employeeId:string;

  constructor(private employeeService:EmployeeService,private router:Router) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData = () => {
    const segments = this.router.url.split('/');
    const overviewIndex = segments.indexOf('overview');
    this.employeeId=segments[overviewIndex + 1];
    this.employeeService.getEmployeebyId(this.employeeId).subscribe(
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
      }
    )
  };

  refresh = () => {
    this.isLoading = true;
    this.loadData();
  };
}
