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
  public taskState: String;

  constructor(private httpClient: HttpRESTClientService) { 
    this.taskId = sessionStorage.getItem('taskId');
    this.taskState = sessionStorage.getItem('taskState');

    if(this.taskState == 'decyzja'){
      this.content = "Nowe zgłoszenie od klienta. Podejmij decyzję czy mozna przyjać.";
      this.mail = "Klient";
			
		} else if (this.taskState === 'przygotowanie'){
      this.content = "Przygotuj plik z zamówieniem i prześlij go do swoich pracowników.";
      this.mail = "System";
    } else if(this.taskState === 'dodawanieProduktow'){
      this.content = "Pobierz plik ze swoim zadaniem i przygotuj swoją część zamówienia.";
      this.mail = "Kierownik";
		}else if (this.taskState === 'zatwierdzenie'){
      this.mail = "Pracownicy";
			this.content = "Przejrzyj przygotowane przez pracowników zamówienie i prześlij do klienta klikając Zatwierdz.";
		}
	}
  
  ngOnInit() {
  }

}
