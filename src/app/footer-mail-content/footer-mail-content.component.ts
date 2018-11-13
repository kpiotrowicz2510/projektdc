import { HttpClient } from '@angular/common/http';
import { HttpRESTClientService } from './../http-REST-client/http-REST-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-mail-content',
  templateUrl: './footer-mail-content.component.html'
})
export class FooterMailContentComponent implements OnInit {
  
//etap
// 1) decyzji Pracownik 1                ---> "decyzji"
// 2) przygotowania oferty Pracownik 1   ---> "przygotowania"
// 3) dodawania produktu Pracownik 2,3   ---> "dodawania"
// 4) zatwierdzania Pracownik 1          ---> "zatwierdzania"
  
  private etap = "decyzji";
  
  public odrzuc = false;
  public uzasadnienieOdrzucenia = false;
  public zakoncz = false;
  public zmien = false;
  public wrzuc = false;
  public zatwierdz = false;
  
  constructor(private httpClient: HttpClient) { }

  pokazUzasadnienie = function(){
	  this.uzasadnienieOdrzucenia = true;
	  this.zakoncz = true;
	  this.zatwierdz = false;
	  	  
  }
  
  pokazWrzuc = function(){
	  this.wrzuc = true;

  }
  
  ngOnInit() {
    if(this.etap == 'decyzji'){
			this.odrzuc = true; //-> uzasadnienie + zakoncz
			this.zatwierdz = true;
			
		} else if (this.etap === 'przygotowania' || this.etap === 'dodawania'){
			this.wrzuc = true;
			this.zatwierdz = true;
			
		}else if (this.etap === 'zatwierdzania'){
			this.zmien = true; //-> wrzuc
			this.zatwierdz = true;
			
		}
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
