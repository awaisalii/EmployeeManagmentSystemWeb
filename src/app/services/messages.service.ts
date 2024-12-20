import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  url=environment.baseUrl;
  constructor(private httpClient:HttpClient) { }

  getAllChats(){
    return this.httpClient.get(`${this.url}/Messages/GetALLChats`,);
  }

}
