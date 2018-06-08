import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Time } from './time.model';
import { Project } from './project.model';

@Injectable()
export class TimeService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, @Inject('baseUrl') private baseUrl: string) {}

  getAllTimes(): Observable<Time[]> {
    const url = `${this.baseUrl}/times`;
    return this.http.get<Time[]>(url).pipe(catchError(this.handleError('getAllTimes', [])));
  }

  getAllProjects(): Observable<Project[]> {
    const url = `${this.baseUrl}/projects`;
    return this.http.get<Project[]>(url).pipe(catchError(this.handleError('getAllProjects', [])));
  }

  getTime(id: number) {
    const url = `${this.baseUrl}/times/${id}`;
    return this.http.get<Time>(url).pipe(catchError(this.handleError('getTime', new Time())));
  }

  saveTime(date: string, project: string, costType: string, amount: number, comment: string) {
    const url = `${this.baseUrl}/times`;
    const body = JSON.stringify({ date, amount, project, costType, comment });

    return this.http
      .post(url, body, this.httpOptions)
      .pipe(catchError(this.handleError('saveTime')));
  }

  updateTime(time: Time) {
    const url = `${this.baseUrl}/times/${time.id}`;
    return this.http.put(url, time).pipe(catchError(this.handleError('saveTime')));
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
