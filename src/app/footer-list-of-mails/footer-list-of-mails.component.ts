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
    this.httpClient.post_start_task('').subscribe();
  }

  denyOffer() {
    this.httpClient.post_complete_task(1, '').subscribe();
  }

}
