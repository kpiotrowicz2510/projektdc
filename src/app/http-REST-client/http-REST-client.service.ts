import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, ResponseContentType, RequestOptions } from '@angular/http';
import { saveAs } from 'file-saver';
import { callbackify } from 'util';
@Injectable({
    providedIn: 'root',
})


export class HttpRESTClientService {
    url: string = 'http://localhost:8080/activiti-service/api';
    
   public currentTaskId = "1";
   constructor(private http: HttpClient) { }

    get_tasks() {
        return this.http.get(this.url + '/process/tasks', {headers: {'client-key': sessionStorage.getItem('client-id')}});
    }

    post_complete_task(index: string, body: any) {
        return this.http.post(this.url + '/process/complete/' + index, body, {headers: {'client-key': sessionStorage.getItem('client-id')}});
    }

    put_task(index: string, body: any) {
        return this.http.put(this.url + '/process/' + index, body, {headers: {'client-key': sessionStorage.getItem('client-id')}});
    }

    post_start_task(body: any) {
        return this.http.post(this.url + '/process/start', body, {headers: {'Content-Type': 'application/json', 'client-key': sessionStorage.getItem('client-id')}});
    }

    get_doc_task(index: string, docIndex: number) {
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/pdf');
        return this.http.get(this.url + '/process/' + index + '/document/' + docIndex, { headers}).toPromise().then(response => this.saveToFileSystem(response));
    }

    private saveToFileSystem(response) {
        const contentDispositionHeader: string = response.headers.get('Content-Disposition');
        const parts: string[] = contentDispositionHeader.split(';');
        const filename = parts[1].split('=')[1];
        const blob = new Blob([response._body], { type: 'application/pdf' });
        saveAs(blob, filename);
    }

    post_doc_task(index: string,files, body) {
        const options = {} as any; // Set any options you like
        const formData = new FormData();

        for (const file of files) {
            formData.append(file.name, file)
        }

        Object.keys(body).forEach(key => {
            formData.append(key, body[key]);
        });

        return this.http.post(this.url + '/process/' + index + '/document', formData,  {headers: {'client-key': sessionStorage.getItem('client-id')}});
    }

    post_doc_initial_task(index: string,files, body) {
        const options = {} as any; // Set any options you like
        const formData = new FormData();

        for (const file of files) {
            formData.append(file.name, file)
        }

        Object.keys(body).forEach(key => {
            formData.append(key, body[key]);
        });

        return this.http.post(this.url + '/process/' + index + '/initDocument', formData, {headers: {'client-key': sessionStorage.getItem('client-id')}});
    }

    getInitialFile(){
        //TODO
        let headers= new HttpHeaders({
            'Content-Type': 'application/octet-stream',
            'Accept': 'application/octet-stream',
            'client-key': sessionStorage.getItem('client-id')
        })
      
      
        return this.http.get(this.url + '/templates/initial', { headers: headers, responseType: 'blob' });
       
    }
   
    getOrderFile(){
        //TODO
        let headers = new HttpHeaders({
            'Content-Type': 'application/octet-stream',
            'Accept': 'application/octet-stream',
            'client-key': sessionStorage.getItem('client-id')
        })
        return this.http.get(this.url + '/templates/order', { headers: headers, responseType: 'blob' });
    }

    getMergedExcel(taskId: number){
        //TODO
        let headers = new HttpHeaders({
            'client-key': sessionStorage.getItem('client-id'),
            'Content-Type': 'application/octet-stream',
            'Accept': 'application/octet-stream'
        })
        return this.http.get(this.url + '/process/' + taskId + '/mergedExcel', { headers: headers, responseType: 'blob' });
    }

    http_get(inUrl: string, callback) {
        return this.http.get(this.url + inUrl).subscribe(
            res => callback(res),
            error => console.error(error)
        );
    }

    http_post(inUrl: string, body: any, callback) {
        this.http.post(this.url + inUrl, body).subscribe(
            res => { callback(res) },
            error => { console.error(error) },
        );
    }

    http_put(inUrl: string, body: any) {
        this.http.put(this.url + inUrl, body);
    }



}