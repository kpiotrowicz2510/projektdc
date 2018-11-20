import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpRESTClientService } from '../http-REST-client/http-REST-client.service';

@Component({
  selector: 'app-footer-list-of-mails',
  templateUrl: './footer-list-of-mails.component.html'
})
export class FooterListOfMailsComponent implements OnInit {
  constructor(private httpClient: HttpRESTClientService) { }

  ngOnInit() {
  }

  acceptOffer() {
    const userName = sessionStorage.getItem('user-name');
    this.httpClient.post_start_task({"decision":"ACCEPT", "assignee":userName}).subscribe();
  }

  denyOffer() {
    this.httpClient.post_complete_task(1, {"decision":"REJECT"}).subscribe();
  }

}
