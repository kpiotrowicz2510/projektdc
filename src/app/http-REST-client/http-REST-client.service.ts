import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { saveAs } from 'file-saver';
import { callbackify } from 'util';
@Injectable({
    providedIn: 'root',
})
export class HttpRESTClientService {
    url: string = 'http://localhost:8080/activiti-service/api';
   
   constructor(private http: HttpClient) { }

    get_tasks() {
        return this.http.get(this.url + '/process/tasks');
    }

    post_complete_task(index: number, body: string) {
        return this.http.post(this.url + '/process/complete/' + index, body);
    }

    put_task(index: number, body: string) {
        return this.http.put(this.url + '/process/' + index, body);
    }

    post_start_task(body: string) {
        return this.http.post(this.url + '/process/start',body);
    }

    get_doc_task(index: number, docIndex: number) {
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

    post_doc_task(index: number,files, body) {
        const options = {} as any; // Set any options you like
        const formData = new FormData();

        for (const file of files) {
            formData.append(file.name, file)
        }

        Object.keys(body).forEach(key => {
            formData.append(key, body[key]);
        });

        return this.http.post(this.url + '/process/' + index + '/document', formData);
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