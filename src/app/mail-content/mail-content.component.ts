import { Component, OnInit, Input } from '@angular/core';
import { HttpRESTClientService } from '../http-REST-client/http-REST-client.service';

@Component({
  selector: 'app-mail-content',
  templateUrl: './mail-content.component.html'
})
export class MailContentComponent implements OnInit {
  name: String;
  surname: String;
  mail: String;
  date: String;
  content: String;
  public taskId: String;

  constructor(private httpClient: HttpRESTClientService) { 
    this.taskId = sessionStorage.getItem('taskId');
    
	}
  
  ngOnInit() {
  }

}
