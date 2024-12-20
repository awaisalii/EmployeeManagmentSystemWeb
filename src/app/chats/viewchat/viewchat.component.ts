import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-viewchat',
  templateUrl: './viewchat.component.html',
  styleUrls: ['./viewchat.component.scss']
})
export class ViewchatComponent {
  @Input() chatId:string;

}
