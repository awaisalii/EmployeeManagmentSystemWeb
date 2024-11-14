// import { notify } from 'devextreme/ui/notify';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection: signalR.HubConnection | undefined;

  public startConnection() {
    if (localStorage.getItem('token')) {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7098/chathub', {
          accessTokenFactory: () => {
            const token= localStorage.getItem("token")
            return token; // Adjust this if your token is stored differently
          }
        }) // Backend URL
        .configureLogging(signalR.LogLevel.Information) // Optional: Add logging for debugging
        .build();

      this.hubConnection
        .start()
        .then(() => {
          console.log('Connection started');
          // Optionally, invoke methods here after connection starts
        })
        .catch(err => console.error('Error while starting connection: ' + err));

      // Handle reconnection
      this.hubConnection.onreconnecting(err => {
        console.log('Attempting to reconnect...', err);
      });

      this.hubConnection.onreconnected(connectionId => {
        console.log('Reconnected. Connection ID:', connectionId);
      });

      this.hubConnection.onclose(err => {
        console.log('Connection closed. Error:', err);
        // Optionally, you might want to restart the connection here
        // this.startConnection();
      });
    } else {
      console.log('No token found, cannot start connection.');
    }
  }

  public addGroupMessageListener(callback: (message) => void) {
    if (!this.hubConnection) {
      console.error('SignalR hub connection is not established.');
      return;
    }
    this.hubConnection.on('ReceiveGroupMessage', (message) => {
      console.log("Received message:", message);
      callback(message);
    });
  }


  public addPrivateMessageListener(callback: (message: any) => void) {
    this.hubConnection?.on('ReceivePrivateMessage', (message: string) => {
      console.log(message)
      callback(message);
    });
  }


  public joinTaskGroup(taskId: string) {
    this.hubConnection?.invoke('JoinTaskGroup', taskId).catch((err) => console.error(err));
  }

public sendMessageToTaskGroup(groupChatId: number, message: string) {
  return this.hubConnection?.invoke('SendMessageToTaskGroup', groupChatId, message);
}
  public sendPrivateMessage(receiverUserId: string, message: string): Promise<void> {
    return this.hubConnection?.invoke('SendPrivateMessage', receiverUserId, message)
        .then(() => {
            console.log('Private message sent successfully.');
            return Promise.resolve();
        })
        .catch((err) => {
            console.error('Error sending private message:', err);
            return Promise.reject(err);
        });
}

}


