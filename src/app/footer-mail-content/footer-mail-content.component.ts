import { HttpClient } from '@angular/common/http';
import { HttpRESTClientService } from './../http-REST-client/http-REST-client.service';
import { Component, OnInit } from '@angular/core';
import { Task } from '../models/Task';

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
  
  private etap = "przygotowania";
  
  public odrzuc = false;
  public uzasadnienieOdrzucenia = false;
  public zakoncz = false;
  public zmien = false;
  public wrzuc = false;
  public zatwierdz = false;
  public tasks;
  public taskId;
  
  constructor(private httpClient: HttpRESTClientService) { }

  
  
  ngOnInit() {
    this.taskId = sessionStorage.getItem('taskId');

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
    this.httpClient.post_complete_task(1, {}).subscribe();
  }

  addComment(comment) {
    const taskObj = { Comment: comment };
    this.httpClient.put_task(1, taskObj).subscribe();
  }

  finishProcess() {
    const comment = (<HTMLInputElement>document.getElementById('uzasadnienieOdrzuceniaField')).value;
    this.addComment(comment);
    this.httpClient.post_complete_task(1, {}).subscribe();
  }

  pokazUzasadnienie(comment) {
    this.uzasadnienieOdrzucenia = true;
	  this.zakoncz = true;
	  this.zatwierdz = false;
  }
  
  pokazWrzuc() {
	  this.wrzuc = true;

  }

  handleUpload(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.httpClient.post_doc_task(1, fileInput.target.files, '').subscribe();
    }
  }

}
