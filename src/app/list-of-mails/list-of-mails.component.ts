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
    this.loadEntries();
  }

  loadEntries(){
    this.displayLoading = true;
    this.httpClient.get_tasks().subscribe((data: Task[]) => {
      this.tasks = data;
      this.displayLoading = false;
    }
      );
    
  }

  selectMail = function(mail){  

    sessionStorage.setItem('taskId', mail.taskId);
    sessionStorage.setItem('taskState', mail.taskDefinitionKey);
    this.httpClient.currentTaskId = mail.taskId;
    for (let i in this.tasks) {
      this.tasks[i].active = "";
    }

    mail.active = 'active';
    window.location.reload();
  }
  
  ngOnInit() {}
  
}
