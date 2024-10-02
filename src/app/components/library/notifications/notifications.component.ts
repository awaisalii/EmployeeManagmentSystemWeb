import { ActivitiesService } from './../../../services/activities.service';
import { AfterViewInit, Component, Input, NgModule, OnInit } from '@angular/core';
import { StatusSelectBoxModule } from '../status-select-box/status-select-box.component';
import { PicturedItemSelectBoxModule } from '../pictured-item-select-box/pictured-item-select-box.component';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxDateBoxModule, DxFormModule, DxNumberBoxModule, DxScrollViewModule, DxSelectBoxModule, DxTextBoxModule, DxToolbarModule, DxValidatorModule } from 'devextreme-angular';
import { FormPhotoModule } from '../../utils/form-photo/form-photo.component';
import { FormTextboxModule } from '../../utils/form-textbox/form-textbox.component';
import { ApplyPipeModule } from 'src/app/pipes/apply.pipe';
import { DevExtremeModule } from 'src/app/dev-extreme/dev-extreme.module';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements  OnInit {
  isLoading: boolean = false;
  isContentScrolled = false;
  activities:any;
  constructor(private ActivitiesService:ActivitiesService){

  }
  ngOnInit(): void {
    this.isLoading = true; // Set loading to true before the request
    this.ActivitiesService.getAllActivities().subscribe(
      (response) => {
        this.activities = response; // Assign response to activities
        this.isLoading = false; // Set loading to false after the response is received
      },
      (error) => {
        console.error('Error fetching activities', error); // Handle error case
        this.isLoading = false; // Set loading to false even if there's an error
      }
    );
  }
}

@NgModule({
  imports: [
    DevExtremeModule,
    ApplyPipeModule,
    DxButtonModule,
    DxDateBoxModule,
    DxFormModule,
    DxNumberBoxModule,
    DxToolbarModule,
    DxSelectBoxModule,
    DxScrollViewModule,
    DxTextBoxModule,
    FormTextboxModule,
    FormPhotoModule,
    DxValidatorModule,
    CommonModule,
    PicturedItemSelectBoxModule,
    StatusSelectBoxModule,
  ],
  declarations: [NotificationsComponent],
  exports: [NotificationsComponent],
})
export class NotificationsModule { }
