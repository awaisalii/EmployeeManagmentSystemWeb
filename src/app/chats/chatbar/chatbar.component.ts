import { CardMessagesComponent } from 'src/app/components';
import { MessagesService } from './../../services/messages.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chatbar',
  templateUrl: './chatbar.component.html',
  styleUrls: ['./chatbar.component.scss']
})
export class ChatbarComponent implements OnInit {
  @ViewChild(CardMessagesComponent) messgaCardComponent:CardMessagesComponent;
  chats:any;
  sidebarWidth:string='350px';
  display:string='block'
  constructor(private MessagesService:MessagesService){

  }
  ngOnInit(): void {
    debugger
      this.MessagesService.getAllChats().subscribe(response=>{
        const data:any=response;
        this.chats=data.privateChats.chatsUsers
      });
    console.log(this.chats)
    }
    changeChat(id:string){
      debugger
      if(this.messgaCardComponent){
        this.messgaCardComponent.user=id;
        this.messgaCardComponent.ngOnInit();
        // this.messgaCardComponent.triggerChat(id);
      }
    }

    toggleSidebar(){
      if(this.sidebarWidth=='350px'){
        this.sidebarWidth='50px'
        this.display='none'
      }else{
        this.sidebarWidth='350px'
        this.display='block'
      }
    }
}
