import { HttpRESTClientService } from './http-REST-client/http-REST-client.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListOfMailsComponent } from './list-of-mails/list-of-mails.component';
import { FooterListOfMailsComponent } from './footer-list-of-mails/footer-list-of-mails.component';
import { MailContentComponent } from './mail-content/mail-content.component';
import { FooterMailContentComponent } from './footer-mail-content/footer-mail-content.component';
import { NotificationComponent } from './notification/notification.component';
import { AuthenticationComponent } from './authentication/authentication.component';

@NgModule({
  declarations: [
    AppComponent,
    ListOfMailsComponent,
    FooterListOfMailsComponent,
    MailContentComponent,
    FooterMailContentComponent,
    NotificationComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
      AppRoutingModule,
     HttpClientModule,
     FormsModule
  ],
  providers: [HttpRESTClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
