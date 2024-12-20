import { AttendenceService } from './../services/attendence.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.scss']
})
export class AttendenceComponent implements OnInit  {

  attedence;
  openedIndex: number | null = null;

  constructor(private AttendenceService:AttendenceService){ }

  ngOnInit(): void {
    this.fetchAttendence();
    this.openedIndex = 0;
  }
  fetchAttendence(){
    this.AttendenceService.getLoggedInUserAttendence().subscribe(response=>{
      debugger
      this.attedence = response
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date descending
  .map(item => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString() // Format the date
  }))
  .reduce((acc, item:any) => {
    // Find existing group by formattedDate
    const existingDateGroup = acc.find(group => group.formattedDate === item.formattedDate);

    if (existingDateGroup) {
      debugger
      existingDateGroup.records.push({
        attendenceId: item.attendenceId,
        userId: item.userId,
        date: item.date,
        checkIn: item.checkIn,
        checkOut: item.checkOut,
      });
    } else {
      // If the group doesn't exist, create a new group with this record
      debugger
      acc.push({
        formattedDate: item.formattedDate,
        date: item.date,
        records: [{
          attendenceId: item.attendenceId,
          userId: item.userId,
          date: item.date,
          checkIn: item.checkIn,
          checkOut: item.checkOut,
        }],
      });
    }
    return acc;
  }, []);


      console.log(this.attedence);
      console.log(response);
    })
  }

  toggleAccordion(index: number): void {
    this.openedIndex = this.openedIndex === index ? null : index;
  }
  checkIn(){
    this.AttendenceService.checkIn().subscribe((response)=>{
      this.fetchAttendence();
      console.log(response);
    })
  }
  checkOut(){
    this.AttendenceService.checkOut().subscribe((complete)=>{
      this.fetchAttendence();
      console.log(complete);
    })
  }
}
