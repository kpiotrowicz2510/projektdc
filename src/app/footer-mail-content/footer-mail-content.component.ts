import { HttpClient } from '@angular/common/http';
import { HttpRESTClientService } from './../http-REST-client/http-REST-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-mail-content',
  templateUrl: './footer-mail-content.component.html'
})
export class FooterMailContentComponent implements OnInit {
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  passFurther() {
    this.httpClient.post('http://localhost:8080/activiti-service/api/process/complete/1', {}).subscribe();
  }

  addComment() {
    this.httpClient.post('http://localhost:8080/activiti-service/api/process/1/document', {}).subscribe();
  }

  finishProcess() {
    this.httpClient.post('http://localhost:8080/activiti-service/api/process/complete/1', {}).subscribe();
  }

}
