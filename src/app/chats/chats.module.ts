import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsRoutingModule } from './chats-routing.module';
import { ChatsComponent } from './chats.component';
import { ChatbarComponent } from './chatbar/chatbar.component';
import { ViewchatComponent } from './viewchat/viewchat.component';
import { SharedModule } from '../shared/shared.module';
import { CardMessagesComponent, CardMessagesModule } from '../components';
import { DevExtremeModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    ChatsComponent,
    ChatbarComponent,
    ViewchatComponent
  ],
  imports: [
    CommonModule,
    ChatsRoutingModule,
    SharedModule,
    CardMessagesModule,
    DevExtremeModule
  ]
})
export class ChatsModule { }
