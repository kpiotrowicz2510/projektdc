import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class HttpRESTClientService {
    url: string = 'http://localhost:8080/activiti-service/api';
   
   constructor(private http: HttpClient) { }

    get_tasks() {
        return this.http.get(this.url + '/process/tasks');
    }

    http_get(inUrl: string) {
        return this.http.get(this.url + inUrl);
    }

    http_post(inUrl: string, body: any) {
        this.http.post(this.url + inUrl, body);
    }

    http_put(inUrl: string, body: any) {
        this.http.put(this.url + inUrl, body);
    }


}