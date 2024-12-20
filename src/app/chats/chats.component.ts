import { Component } from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent {
  viewSideBar = 'block';
  // view_side_bar=''
  chatId: string = "";
  toggleSidebar() {
    debugger
    if (this.viewSideBar == 'none') {
      this.viewSideBar = 'block'
    } else {
      this.viewSideBar = 'none'
    }
  }
  receiveMessage($event: any) {
    this.chatId = $event;
  }

}
