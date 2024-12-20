import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@aspnet/signalr';
import notify from 'devextreme/ui/notify';
import { ToastrService } from 'ngx-toastr';
import { Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  hubConnection: signalR.HubConnection;
  personName:string;
  ssSubj=new Subject<any>();
  constructor(
    public toastr:ToastrService,
    public router:Router
  ) {}
  ssObs():Observable<any>{
    return this.ssSubj.asObservable();
  }


  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7179/updateHub", {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
  })
    .build();

    this.hubConnection
      .start()
      .then(() => {
        this.askServerListener();
        this.askServer();
      })
      .catch(err => console.log("Error while creating connection: " + err));
  }

  askServer() {
    this.hubConnection.invoke("Notification", "hey")
    .then(() => {
    })
    .catch(err => console.log("askService invocation failed: " + err));
    console.log("This is final prompt");
  }

  askServerListener() {
    console.log("Ask Server Listener");
    this.hubConnection.on("Notification", (someText) => {
      notify(someText,"success",2000);
    });
  }
}
