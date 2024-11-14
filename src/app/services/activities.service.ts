import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Activity } from '../types/activities';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private url=environment.baseUrl;
  constructor(private HttpClient:HttpClient) { }

  getAllActivities(){
    return  this.HttpClient.get(`${this.url}/api/activities`);
  }

  getUserActivities(id:string ):Observable<Activity[]>{
    return  this.HttpClient.get<Activity[]>(`${this.url}/api/activities/User/${id}`);
  }

  getUserMessages(reciverId){
    return this.HttpClient.get(`${this.url}/Messages?reciver=${reciverId}`);
  }
  getGroupMessages(id:number){
    return this.HttpClient.get(`${this.url}/Messages/GroupMessages?id=${id}`)
  }
}
