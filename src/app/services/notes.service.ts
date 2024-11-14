import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {


  url=environment.baseUrl;
  constructor(private httpClient:HttpClient) { }


  createNote(note:any){
    return this.httpClient.post(`${this.url}/api/Notes`,note);
  }
  getUserNotes(id:string):Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.url}/api/Notes/User/${id}`)
  }
}
