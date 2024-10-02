import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SelectBoxesService {

  url=environment.baseUrl;
  constructor(private http:HttpClient) { }
   getUserSelectBox(){
    return  this.http.get(`${this.url}/api/UserSelectBox`);
   }

}
