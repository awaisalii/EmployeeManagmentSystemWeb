import { AuthService } from './../../../services/auth.service';
import { AppHeaderComponent } from './../app-header/app-header.component';
import { ActivitiesService } from './../../../services/activities.service';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component, ElementRef, Input, NgModule,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  DxTextAreaModule,
  DxTextBoxModule,
  DxButtonModule,
  DxToolbarModule,
  DxFileUploaderModule,
  DxValidationGroupModule,
  DxValidatorModule,
  DxScrollViewModule,
} from 'devextreme-angular';
import { Message, Messages } from 'src/app/types/messages';
import { UserAvatarModule } from 'src/app/components/library/user-avatar/user-avatar.component';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'card-messages',
  templateUrl: './card-messages.component.html',
  styleUrls: ['./card-messages.component.scss'],
})
export class CardMessagesComponent implements OnInit,AfterViewInit {
  @Input() user: string;
  @Input() items: any;
  @Input() groupChatId:number;
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  textBoxHeight:number=14;
  contentBoxHeight:number=45;
  messageTitle = '';
  currentUser:string=this.AuthService._user.name;
  userImageUrl:string=this.AuthService._user.avatarUrl;
  messages:any;
  hasscrolled:boolean=false;
  messageText = '';
  constructor(private chatService:ChatService,private ActivitiesService:ActivitiesService,private AuthService:AuthService){

  }

  ngOnInit(): void {
    this.chatService.startConnection();
    if(this.groupChatId!=null){
      this.ActivitiesService.getGroupMessages(this.groupChatId).subscribe(response=>{
        this.messages=response;
      })
      this.chatService.addGroupMessageListener((message) => {
          this.messages.push(message);
        setTimeout(() => {
          this.scrollToBottom();
          this.hasscrolled=true
        }, 1000);
      });
      setTimeout(() => {
        this.chatService.joinTaskGroup((this.groupChatId).toString());
      }, 2000);
    }
    else{
      this.ActivitiesService.getUserMessages(this.user).subscribe(response=>{
        this.messages=response;
      })
      this.chatService.addPrivateMessageListener((message) => {
        if(message.senderId==this.user){
          this.messages.push(message);
        }
        setTimeout(() => {
          this.scrollToBottom();
          this.hasscrolled=true
        }, 1000);
      });
    }


  }
  ngAfterViewInit(): void {
      this.AuthService;
  }
  sendMassage = async () => {
    if(this.user && this.messageText){
      this.chatService.sendPrivateMessage(this.user, this.messageText)
      .then(() => {
        const fullPath=this.userImageUrl;
        const baseUrl = "https://localhost:7098/uploads/images/";
        const imageName = fullPath.replace(baseUrl, "");
        const newMessage={
          user:this.currentUser,
          message:this.messageText,
          date: new Date(),
          imagePath:imageName
        }
        this.messages=[...this.messages,newMessage];
        this.hasscrolled=false;
        setTimeout(() => {
          this.scrollToBottom();
          this.hasscrolled=true
          this.messageText="";
        }, 1000);
      })
      .catch((err) => {
        console.log(err)
      });

    }
    if(this.groupChatId && this.messageText){
      this.chatService.sendMessageToTaskGroup(this.groupChatId, this.messageText)
      .then(() => {
        this.hasscrolled=false;
        setTimeout(() => {
          this.scrollToBottom();
          this.hasscrolled=true
          this.messageText="";
        }, 1000);
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }

  ngAfterViewChecked() {
    if(this.hasscrolled==false){
      this.scrollToBottom();
    }
  }

  onScroll(){
    this.hasscrolled=true;
  }

  private scrollToBottom(): void {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }

  getAvatarText(name: string) {
    return name.split(' ').map((name) => name[0]).join('');
  }

  getText(data: any) {
    return data.text.replace('{username}',  data.manager !== this.items[0].manager ? this.items[0].manager : this.items[1].manager);
  }

  send = (e) => {
    if (!e.validationGroup.validate().isValid) {
      return;
    }

    const newMessage: any = {
      subject: this.messageTitle,
      text: this.messageText,
      manager: this.user,
      date: new Date(),
    };

    this.items.push(newMessage);

    e.validationGroup.reset();
  };
}

@NgModule({
  imports: [
    DxTextAreaModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxFileUploaderModule,
    DxButtonModule,
    DxValidationGroupModule,
    DxValidatorModule,
    UserAvatarModule,
    CommonModule,
    DxScrollViewModule
  ],
  declarations: [CardMessagesComponent],
  exports: [CardMessagesComponent],
})
export class CardMessagesModule { }
