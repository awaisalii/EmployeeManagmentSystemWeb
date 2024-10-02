import {
  AfterViewInit,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxTextBoxModule,
  DxFormModule,
  DxValidatorModule,
  DxDateBoxModule,
  DxFileUploaderModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import {
  FormTextboxModule,
  FormPhotoUploaderModule,
} from 'src/app/components';
import { ContactBase, contactStatusList, newContact } from 'src/app/types/contact';
import { getSizeQualifier } from 'src/app/services/screen.service';
import { SelectBoxesService } from 'src/app/services/select-boxes.service';


@Component({
  selector: 'contact-new-form',
  templateUrl: './contact-new-form.component.html',
  providers: [],
})

export class ContactNewFormComponent  implements OnInit   {
  newUser: any={

  } ;
  getSizeQualifier = getSizeQualifier;
  usersList ;
  statusSelectBox=contactStatusList;
  constructor(private selectBoxService:SelectBoxesService) {
  }
  ngOnInit(): void {
    this.selectBoxService.getUserSelectBox().subscribe(response=>{
      this.usersList=response;
    }
    )
  }



  onFileUploaded(e) {
    const fileInfo = e.file;
  }
  getNewContactData = ()=> ({ ...this.newUser })
}

@NgModule({
  imports: [
    DxTextBoxModule,
    DxFormModule,
    DxValidatorModule,

    FormTextboxModule,
    FormPhotoUploaderModule,
    DxDateBoxModule,
    CommonModule,
    DxFileUploaderModule,
    DxSelectBoxModule
  ],
  declarations: [ContactNewFormComponent],
  exports: [ContactNewFormComponent],
})
export class ContactNewFormModule { }
