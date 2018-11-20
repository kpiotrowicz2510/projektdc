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
  listOfMails: any[] = [];

  constructor(private httpClient: HttpRESTClientService) {
    
    this.httpClient.get_tasks().subscribe((data: Task[]) => this.tasks = data);
  }

  selectMail = function(mail){  

    sessionStorage.setItem('taskId', mail.taskId);
    this.httpClient.currentTaskId = mail.taskId;
    for (let i in this.tasks) {
      this.tasks[i].active = "";
    }

    mail.active = 'active';
  }
  
  ngOnInit() {}
  
}
