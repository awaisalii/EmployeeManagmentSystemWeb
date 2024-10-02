import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectBoxesService } from 'src/app/services/select-boxes.service';
import { MailData } from 'src/app/types/contact';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})

export class MailComponent implements OnInit  {
  successToastVisible:boolean=false;
  sentSuccessToastVisible:boolean=false;
  loadingVisible:boolean=false;
  isSaveClicked:boolean;
  formData:MailData={
    emails:[],
    subject:'',
    message:'',
  };
  selectedEmails: string[] = [];
  recipientTagBoxOptions: any = {};
  recipientTagBoxOptionsDataSource: any[] = [];
  public htmlEditorOptions: any;
  public valueContent: string;
  public isMultiline: boolean;
  public tabs: { name: string, value: string }[];
  public currentTab: string;
  constructor(private selectBoxService: SelectBoxesService, private route:ActivatedRoute, private router:Router) {
    this.selectBoxService.getUserSelectBox().subscribe(response => {
      this.recipientTagBoxOptions = {
        dataSource: response,
        displayExpr: 'userName',
        valueExpr: 'id',
        searchEnabled: true,
        placeholder: 'Select recipients',
      };
    });
    this.htmlEditorOptions = {
      height: 300, // You can set height or other options
      toolbar: {
        items: [
          'bold', 'italic', 'underline', 'strike', 'separator',
          'alignLeft', 'alignCenter', 'alignRight', 'alignJustify',
        ]
      }
    };
    this.valueContent = ''; // Set your default content here
    this.isMultiline = false; // Default value for multiline toolbar
    this.tabs = [
      { name: 'File', value: 'file' },
      { name: 'URL', value: 'url' },
    ];
    this.currentTab = this.tabs[0].value; // Default selected tab
  }



  ngOnInit(): void {
    const segments = this.router.url.split('/');
    const id = segments[3];
    if (id) {
      this.selectedEmails = [id];  // Set the ID as the selected value
      this.recipientTagBoxOptions = {
        ...this.recipientTagBoxOptions,
        value: this.selectedEmails
      };
  }
  }
  sendButtonClick(e){
    console.log(e);
  }
  textButtonClick(e){

  }

  onFormSubmit(e){
    console.log(this.formData)
  }
}
