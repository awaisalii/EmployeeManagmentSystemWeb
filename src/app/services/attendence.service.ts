import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Attedence } from '../types/Employee';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {

  url=environment.baseUrl;
  constructor(private httpClient:HttpClient) { }

  getLoggedInUserAttendence():Observable<Attedence[]> {
   return this.httpClient.get<Attedence[]>(`${this.url}/api/Attendence/Emp/Attendence`);
  }
  checkIn(){
    return this.httpClient.get(`${this.url}/api/Attendence/checkin`)
  }
  checkOut(){
    return this.httpClient.get(`${this.url}/api/Attendence/checkout`)
  }

}

