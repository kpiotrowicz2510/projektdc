import { Component, OnInit } from '@angular/core';
import { HttpRESTClientService } from '../http-REST-client/http-REST-client.service';
import { Task } from '../models/Task';

@Component({
  selector: 'app-list-of-mails',
  templateUrl: './list-of-mails.component.html'
  
})
export class ListOfMailsComponent implements OnInit {
   private tasks;  
  listOfMails: any[] = [];

  constructor(private httpClient: HttpRESTClientService) {
    
    this.httpClient.get_tasks().subscribe((data: Task) => this.tasks = {
      taskDefinitionKey: data['taskDefinitionKey'],
      taskId:  data['taskId'],
      taskVariables: data['taskVariables'],
      processVariables: data['processVariables']
  });

  console.log(this.tasks);

  //TODO: DODAC WRZUCANIE NA LISTE
  /*
  this.tasks.forEach(element => {
    this.listOfMails.push({
      "title": "",
      "taskId":5,
      "from": "jan.kowalski@gmail.com",
    "active": ""
    });
  });
*/
  
  
  }

  selectMail = function(mail){  

    sessionStorage.setItem('taskId', mail.taskId);
	
    for (let i in this.listOfMails) {
      this.listOfMails[i].active = "";
    }

    mail.active = "active"
  }
  
  ngOnInit() {}
  
}
