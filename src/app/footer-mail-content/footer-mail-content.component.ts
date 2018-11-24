import { MailContentComponent } from './../mail-content/mail-content.component';
import { HttpClient } from '@angular/common/http';
import { HttpRESTClientService } from './../http-REST-client/http-REST-client.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Task } from '../models/Task';

@Component({
  selector: 'app-footer-mail-content',
  templateUrl: './footer-mail-content.component.html'
})

export class FooterMailContentComponent implements OnInit{
  
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
  public taskState;
  
  constructor(private httpClient: HttpRESTClientService) { }
  
  ngOnInit() {
    this.taskId = sessionStorage.getItem('taskId');
    this.taskState = sessionStorage.getItem('taskState');

    if(this.taskState == 'decyzja'){
			this.odrzuc = true; //-> uzasadnienie + zakoncz
			this.zatwierdz = true;
			
		} else if (this.taskState === 'przygotowanie' || this.taskState === 'usertask4'){
			this.wrzuc = true;
			this.zatwierdz = true;
			
		}else if (this.taskState === 'zatwierdzania'){
			this.zmien = true; //-> wrzuc
			this.zatwierdz = true;
			
		}
  }

  getCategories(){
    return ['small'];
  }

  passFurther() {
    const userName = sessionStorage.getItem('user-name');
    let taskObject;

    if (this.taskState === 'przygotowania') {
      taskObject = {'decision': 'ACCEPT', 'assignee': userName, 'categories': this.getCategories()};
    }else{
      taskObject = {'decision': 'ACCEPT', 'assignee': userName};
    }

    this.httpClient.post_complete_task(this.taskId, taskObject).subscribe();
    window.location.reload();
  }

  addComment(comment) {
    const taskObj = { Comment: comment };
    this.httpClient.put_task(this.taskId, taskObj).subscribe();
  }

  finishProcess() {
    const comment = (<HTMLInputElement>document.getElementById('uzasadnienieOdrzuceniaField')).value;
    this.addComment(comment);
    this.httpClient.post_complete_task(this.taskId, {"decision":"REJECT"}).subscribe();
    window.location.reload();
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
      this.httpClient.post_doc_task(this.taskId, fileInput.target.files, {}).subscribe();
    }
  }  
}
