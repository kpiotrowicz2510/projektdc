import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Task } from './models/Task';
import { HttpRESTClientService } from './http-REST-client/http-REST-client.service';
import { LoginData } from './authentication/login-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'dc-app';
  public tasks;
  public displayLoading: Boolean;
 listOfMails: any[] = [];
 clientIdSet: boolean;
 loginData: LoginData = new LoginData();
 name: String;
  surname: String;
  mail: String;
  date: String;
  content: String;
  public taskId: any;
  public taskState: String;
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
public pobierz = false;
public pobierzExcel = false;
public pobierzLastStep = false;


 constructor(private httpClient: HttpRESTClientService, private cdr: ChangeDetectorRef) {
  this.loadEntries();
  this.clientIdSet = false;
}

loadTaskContent(){
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

  if(this.taskState == 'decyzja'){
    this.odrzuc = true; //-> uzasadnienie + zakoncz
    this.zatwierdz = true;
    
  } else if (this.taskState === 'przygotowanie'){
    this.wrzuc = true;
    this.zatwierdz = true;
    this.pobierz = true;
  } else if(this.taskState === 'dodawanieProduktow'){
    this.wrzuc = true;
    this.zatwierdz = true;
    this.pobierzExcel = true;
  }else if (this.taskState === 'zatwierdzenie'){
    this.zmien = true; //-> wrzuc
    this.zatwierdz = true;
    this.pobierzLastStep = true;
  }
}

acceptOffer() {
  const userName = sessionStorage.getItem('user-name');
  this.httpClient.post_start_task({"decision":"ACCEPT", "assignee":userName}).subscribe();
}

denyOffer() {
  const taskId = sessionStorage.getItem('taskId');
  this.httpClient.post_complete_task(taskId, {"decision":"REJECT"}).subscribe();
}

authenticate() {
  let response = this.httpClient.http_post('/user/auth', {name: this.loginData.login, hash: this.loginData.password}, (data) => {
    if (typeof data === "string") {
      sessionStorage.setItem('client-id', data);
      sessionStorage.setItem('user-name', this.loginData.login);
      this.clientIdSet = true;
      this.loadEntries();
    }
  });
}

logout() {
  sessionStorage.removeItem('client-id');
  sessionStorage.removeItem('user-name');
  this.clientIdSet = false;
}

ngOnInit() {
  if (sessionStorage.getItem("client-id") == null) this.clientIdSet = false;
    else {
      this.clientIdSet = true;
      this.loginData.login = sessionStorage.getItem('user-name');
    }
}

  loadEntries(){
    this.displayLoading = true;
    this.httpClient.get_tasks().subscribe((data: Task[]) => {
      this.tasks = data;
      this.displayLoading = false;
    }
      );
    
  }

  selectMail = function(mail){  

    sessionStorage.setItem('taskId', mail.taskId);
    sessionStorage.setItem('taskState', mail.taskDefinitionKey);
    this.httpClient.currentTaskId = mail.taskId;
    for (let i in this.tasks) {
      this.tasks[i].active = "";
    }

    mail.active = 'active';
    this.loadTaskContent();
  }

  reload(){
    this.httpClient.get_tasks().subscribe((data: Task[]) => {
      this.tasks = data;
      this.displayLoading = false;
    }
      );
  }

  getCategories(){
    return ['small', 'big'];
  }

  passFurther() {
    const userName = sessionStorage.getItem('user-name');
    let taskObject;

    if (this.taskState === 'przygotowanie') {
      taskObject = {'decision': 'ACCEPT', 'assignee': userName, 'categories': this.getCategories()};
    }else{
      taskObject = {'decision': 'ACCEPT', 'assignee': userName};
    }

    this.httpClient.post_complete_task(this.taskId, taskObject).subscribe(
    function(){
      
    }
    );

    this.reload();
  }

  addComment(comment) {
    const taskObj = { Comment: comment };
    this.httpClient.put_task(this.taskId, taskObj).subscribe();
  }

  finishProcess() {
    const comment = (<HTMLInputElement>document.getElementById('uzasadnienieOdrzuceniaField')).value;
      //this.addComment(comment);
      this.httpClient.post_complete_task(this.taskId, { "decision": "REJECT", "comment": comment }).subscribe(function () {
      
    });

    this.reload();
  }

  pokazUzasadnienie(comment) {
    this.uzasadnienieOdrzucenia = true;
	  this.zakoncz = true;
	  this.zatwierdz = false;
  }
  
  pokazWrzuc() {
	  this.wrzuc = true;

  }

  downloadFile(){
      this.httpClient.getInitialFile().subscribe(response => {
          let ieEDGE = navigator.userAgent.match(/Edge/g);
          let ie = navigator.userAgent.match(/.NET/g); // IE 11+
          let oldIE = navigator.userAgent.match(/MSIE/g); 
          const blob = new Blob([response], { type: "application/octet-stream" })
          let fileName: string = "TemplateInitial.xls";
          if (ie || oldIE || ieEDGE) {
              window.navigator.msSaveBlob(blob, fileName);
          }
          else {
              let link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = fileName;
              link.click();
          }
      });
  }

  downloadOrderFile(){
      this.httpClient.getOrderFile().subscribe(response => {
          let ieEDGE = navigator.userAgent.match(/Edge/g);
          let ie = navigator.userAgent.match(/.NET/g); // IE 11+
          let oldIE = navigator.userAgent.match(/MSIE/g); 

          const blob = new Blob([response], { type: "application/octet-stream" })
          let fileName: string = "TemplateOrder.xls";
          if (ie || oldIE || ieEDGE) {
              window.navigator.msSaveBlob(blob, fileName);
          }
          else {
              let link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = fileName;
              link.click();
          }
      });
  }

  downloadFileMerged(){
      this.httpClient.getMergedExcel(this.taskId).subscribe(response => {
          let ieEDGE = navigator.userAgent.match(/Edge/g);
          let ie = navigator.userAgent.match(/.NET/g); // IE 11+
          let oldIE = navigator.userAgent.match(/MSIE/g);

          const blob = new Blob([response], { type: "application/octet-stream" })
          let fileName: string = "orderMerged.xls";
          if (ie || oldIE || ieEDGE) {
              window.navigator.msSaveBlob(blob, fileName);
          }
          else {
              let link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = fileName;
              link.click();
          }
      });
  }

  handleUpload(fileInput) {

    if(this.taskState === 'przygotowanie'){
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.httpClient.post_doc_initial_task(this.taskId, fileInput.target.files, {}).subscribe();
    }
  }

  if(this.taskState === 'dodawanieProduktow'){
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.httpClient.post_doc_task(this.taskId, fileInput.target.files, {}).subscribe();
    }
  }
  }
}
