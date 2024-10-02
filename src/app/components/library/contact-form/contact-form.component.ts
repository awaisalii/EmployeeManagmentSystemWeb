import {
  Component, NgModule, Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxFormModule,
  DxLoadPanelModule,
  DxNumberBoxModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxValidatorModule,
  DxValidationGroupModule,
} from 'devextreme-angular';
import {
  ContactStatusModule,
  FormTextboxModule,
  FormPhotoModule,
  StatusSelectBoxModule,
} from 'src/app/components';
import { Contact } from 'src/app/types/contact';
import { ValidationRule } from 'devextreme-angular/common';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { ToolbarFormModule } from 'src/app/components/utils/toolbar-form/toolbar-form.component';
import { EmployeeService } from 'src/app/shared/employee.service';
import notify from '../../../../../node_modules/devextreme/ui/notify';
import { Router } from '@angular/router';
import { SelectBoxesService } from 'src/app/services/select-boxes.service';
@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  @Input() contactData: any;

  @Input() isLoading: boolean;

  savedData: Contact = null;
  usersList ;

  recipientTagBoxOptions: any = {};
  zipCodeValidator: ValidationRule = { type: 'pattern', pattern: /^\d{5}$/, message: 'Zip is invalid' };
  isEditing = false;
  constructor(private employeeService:EmployeeService , private router:Router, private selectBoxService:SelectBoxesService) { }
  ngOnInit() {
    this.selectBoxService.getUserSelectBox().subscribe(response=>{
      this.usersList=response;
    }
    )
  }

  handleEditClick() {
    this.savedData = { ...this.contactData };
    this.isEditing = true;
  }

  handleSaveClick({ validationGroup }: DxButtonTypes.ClickEvent) {
    this.savedData = { ...this.contactData };
    if(!validationGroup.validate().isValid) return;
    this.employeeService.UpdateEmployee(this.savedData).subscribe({
      complete:()=>{
         notify('Updated Successfully', 'sucsess',2000 );
      },
      error:(err)=>{
        notify(err, "danger", 2000);
      }
    })
    this.isEditing = false;
    this.savedData = null;
  }

  sendEmail(e){
    this.router.navigate(['Employee/mail/'+this.contactData.id])
  }

  handleCancelClick() {
    this.contactData = { ...this.savedData };
    this.isEditing = false;
  }
}

@NgModule({
  imports: [
    DxFormModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxLoadPanelModule,
    DxValidationGroupModule,

    FormTextboxModule,
    ContactStatusModule,
    FormPhotoModule,
    DxValidatorModule,
    ToolbarFormModule,
    CommonModule,
    StatusSelectBoxModule,
  ],
  providers: [],
  exports: [ContactFormComponent],
  declarations: [ContactFormComponent],
})
export class ContactFormModule { }
