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
  @Input()
  taskId: number;

  constructor(private httpClient: HttpRESTClientService) { 
	this.name = "Jan";
	this.surname = "Kowalski";
	this.mail = "jan.kowalski@gmail.com";
  this.date = "12.12.2018";
  this.taskId = httpClient.currentTaskId;
	this.content = "Hi, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a sagittis dolor. Suspendisse a hendrerit mi. Vivamus a tincidunt arcu, eu maximus mauris. Curabitur consectetur pulvinar diam, id tempor eros condimentum a. Vivamus aliquet neque ut lectus aliquet blandit eget id felis. Vivamus rhoncus sem elit, quis lacinia nisi mollis ut. Mauris id fringilla erat";
  }
  
  ngOnInit() {
  }

}
