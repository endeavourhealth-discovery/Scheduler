import { Injectable } from '@angular/core';
import {URLSearchParams, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Extract} from "./models/Extract";

@Injectable()
export class SchedulerService {

  constructor(private http: Http) { }

  getList(): Observable<Extract[]> {
    const params = new URLSearchParams();

    return this.http.get('/api/scheduler/list', {search: params})
      .map((response) => response.json());
  }

}
