import { Injectable } from '@angular/core';
import {URLSearchParams, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Extract} from './models/Extract';

@Injectable()
export class SchedulerService {

  extract: Extract;

  constructor(private http: Http) { }

  getList(): Observable<Extract[]> {
    return this.http.get('/api/scheduler/get')
      .map((response) => response.json());
  }

  getSelectedExtract(): Extract {
    return this.extract
  }

  setSelectedExtract(extract: Extract) {
    this.extract = extract;
  }

  deleteExtract(id: any): Observable<any> {
    const params = new URLSearchParams();
    params.set('id', id);
    return this.http.delete('api/scheduler', { search : params })
      .map((response) => response.text());
  }

  saveExtract(extract: Extract, editMode: boolean): Observable<Extract> {
    this.setSelectedExtract(extract);
    const params = new URLSearchParams();
    params.set('editMode', editMode ? '1' : '0');
    return this.http.post('api/scheduler/extract/save', extract, {search: params})
      .map((response) => response.json());
  }

  validateCron(extract: Extract): Observable<string> {
    const params = new URLSearchParams();
    return this.http.post('api/scheduler/extract/validate', extract, {search: params})
      .map((response) => response.text());
  }
}
