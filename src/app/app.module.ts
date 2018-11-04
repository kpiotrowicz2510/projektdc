import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListOfMailsComponent } from './list-of-mails/list-of-mails.component';
import { FooterListOfMailsComponent } from './footer-list-of-mails/footer-list-of-mails.component';
import { MailContentComponent } from './mail-content/mail-content.component';
import { FooterMailContentComponent } from './footer-mail-content/footer-mail-content.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    ListOfMailsComponent,
    FooterListOfMailsComponent,
    MailContentComponent,
    FooterMailContentComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }