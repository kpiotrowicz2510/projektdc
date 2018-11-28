import { Component, OnInit } from '@angular/core';
import { HttpRESTClientService } from '../http-REST-client/http-REST-client.service';
import { Task } from '../models/Task';
import { MailContentComponent } from '../mail-content/mail-content.component';

@Component({
  selector: 'app-list-of-mails',
  templateUrl: './list-of-mails.component.html'
  
})
export class ListOfMailsComponent implements OnInit {
   public tasks;
   public displayLoading: Boolean;
  listOfMails: any[] = [];

  constructor(private httpClient: HttpRESTClientService) {
    
  }

  
  
  ngOnInit() {}
  
}
