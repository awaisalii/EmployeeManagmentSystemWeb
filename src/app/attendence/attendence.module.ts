import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendenceRoutingModule } from './attendence-routing.module';
import { AttendenceComponent } from './attendence.component';
import { DevExtremeModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    AttendenceComponent
  ],
  imports: [
    CommonModule,
    DevExtremeModule,
    AttendenceRoutingModule
  ]
})
export class AttendenceModule { }
