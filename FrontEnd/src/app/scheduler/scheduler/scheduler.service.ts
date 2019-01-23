import { Injectable } from '@angular/core';
import {URLSearchParams, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SchedulerService {

  constructor(private http: Http) { }

  getMessage(name: string): Observable<string> {
    const params = new URLSearchParams();

    return this.http.get('/api/scheduler/list', {search: params})
      .map((result) => result.text());
  }

  getList(): Observable<any[]> {
    const params = new URLSearchParams();

    return this.http.get('/api/scheduler/list', {search: params})
      .map((response) => response.json());
  }

}
