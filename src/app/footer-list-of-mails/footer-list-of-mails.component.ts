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
    this.httpClient.http_post('/process/start', {}).subscribe();
  }

  denyOffer() {
    this.httpClient.http_post('/process/complete/1', {}).subscribe();
  }

}
