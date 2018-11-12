import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-of-mails',
  templateUrl: './list-of-mails.component.html'
  
})
export class ListOfMailsComponent implements OnInit {
   
  listOfMails: any[] = [];

  constructor() {
	
    this.listOfMails.push({
        "title": "title1",
        "from": "jan.kowalski@gmail.com",
      "active": ""
      });

      this.listOfMails.push({
        "title": "title2",
        "from": "jan.kowalski@gmail.com",
      "active": ""
      });

      this.listOfMails.push({
        "title": "title3",
        "from": "jan.kowalski@gmail.com",
      "active": ""
      });

      this.listOfMails.push({
        "title": "title4",
        "from": "jan.kowalski@gmail.com",
      "active": ""
      });

      this.listOfMails.push({
        "title": "title5",
        "from": "jan.kowalski@gmail.com",
      "active": ""
      });

      this.listOfMails.push({
        "title": "title6",
        "from": "jan.kowalski@gmail.com",
      "active": ""
      });

      this.listOfMails.push({
        "title": "title7",
        "from": "jan.kowalski@gmail.com",
      "active": ""
      });
  
  }

  selectMail = function(mail){  
	
    for (let i in this.listOfMails) {
      this.listOfMails[i].active = "";
    }

    mail.active = "active"
  }
  
  ngOnInit() {}
  
}
