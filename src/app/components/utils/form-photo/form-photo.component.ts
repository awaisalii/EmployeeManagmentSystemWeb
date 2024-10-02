import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component, ElementRef, Input, NgModule, OnInit,
} from '@angular/core';
import { DxFileUploaderModule } from 'devextreme-angular/ui/file-uploader';

@Component({
  selector: 'form-photo',
  templateUrl: './form-photo.component.html',
  styleUrls: ['./form-photo.component.scss'],
})
export class FormPhotoComponent implements OnInit , AfterViewInit {
  @Input() link: string;

  @Input() editable = false;

  @Input() size = 124;

  imagePatt:string;
  hostRef = this.elRef.nativeElement;

  constructor(private elRef:ElementRef) {}

  ngOnInit() {
    this.editable;
  }
  ngAfterViewInit(): void {
    this.editable;
  }

}

@NgModule({
  imports: [
    DxFileUploaderModule,
    CommonModule
  ],
  declarations: [FormPhotoComponent],
  exports: [FormPhotoComponent],
})
export class FormPhotoModule { }
