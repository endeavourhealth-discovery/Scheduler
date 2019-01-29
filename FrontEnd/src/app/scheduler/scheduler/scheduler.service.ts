import { Injectable } from '@angular/core';
import {URLSearchParams, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Extract} from "./models/Extract";

@Injectable()
export class SchedulerService {

  constructor(private http: Http) { }

  getList(): Observable<Extract[]> {
    return this.http.get('/api/scheduler/get')
      .map((response) => response.json());
  }

  deleteExtract(id: any): Observable<any> {
    const params = new URLSearchParams();
    params.set('id', id);
    return this.http.delete('api/scheduler', { search : params })
      .map((response) => response.text());
  }

  saveExtract(edited: Extract, editMode: boolean): Observable<Extract> {
    let params = new URLSearchParams();
    params.set('editMode', editMode ? "1":"0");
    return this.http.post('api/scheduler/extract/save', edited, {search: params})
      .map((response) => response.json());
  }
}
