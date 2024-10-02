import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  url=environment.baseUrl;
  constructor(private httpClient:HttpClient) { }
  getAllTasks(){
    var result=this.httpClient.get(`${this.url}/api/Tasks`);
    return result;
  }

  getTask(taskId:number){
   return this.httpClient.get(`${this.url}/api/Tasks/Task?taskId=`+taskId);
  }

  UpdateTask(data){
    const headers=new HttpHeaders({
      "content-type": "application/json",
    })
    return this.httpClient.put(`${this.url}/api/Tasks`,data )
  }

  createTask(task){
    task.id=0;
    task.progress="Active";
    task.assignedTo="";
     const headers= new HttpHeaders({
      "content-type":'application/json'
     }) 
     return this.httpClient.post(`${this.url}/api/tasks`,task,{headers})
    }

    deleteTask(id: number){
    return  this.httpClient.delete(`${this.url}/api/Tasks/${id}`);
    }

    getMyTasks(){
      var result=this.httpClient.get(`${this.url}/api/Tasks/GetUserOwnTasks`);
      return result;
    }

}
