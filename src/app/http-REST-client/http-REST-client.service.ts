import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpRESTClientService {
    url: string = 'http://localhost:8080/activiti-service/api';
   
   constructor(private http: HttpClient) { }

    get_tasks() {
        return this.http.get(this.url + '/process/tasks');
    }

}