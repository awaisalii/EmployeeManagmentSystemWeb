import {
  Component, Input, NgModule
} from '@angular/core';

@Component({
  selector: 'user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})

export class UserAvatarComponent {
  @Input() dataLetters: string | null;
  @Input()  userImageUrl:string|null;

}

@NgModule({
  declarations: [UserAvatarComponent],
  exports: [UserAvatarComponent],
})
export class UserAvatarModule { }
