import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, from } from 'rxjs';
import { catchError, switchMap, groupBy, mergeMap, reduce } from 'rxjs/operators';

import { TimeByDate, TimeByProject, Time } from './statistics.model';

@Injectable()
export class StatisticsService {
  constructor(private http: HttpClient, @Inject('baseUrl') private baseUrl: string) {}

  getAllByDate(): Observable<TimeByDate> {
    return this.getAllTimes().pipe(
      switchMap(timeArray => from(timeArray)),
      groupBy(time => time.date),
      mergeMap(group =>
        group.pipe(
          reduce(
            (acc, curr) => {
              acc.amount += curr.amount;
              return acc;
            },
            { date: group.key, amount: 0 }
          )
        )
      )
    );
  }

  getAllByProject(): Observable<TimeByProject> {
    return this.getAllTimes().pipe(
      switchMap(timeArray => from(timeArray)),
      groupBy(time => time.project),
      mergeMap(group =>
        group.pipe(
          reduce(
            (acc, curr) => {
              acc.amount += curr.amount;
              return acc;
            },
            { project: group.key, amount: 0 }
          )
        )
      )
    );
  }

  private getAllTimes(): Observable<Time[]> {
    const url = `${this.baseUrl}/times`;
    return this.http.get<Time[]>(url).pipe(catchError(this.handleError('getAllTimes', [])));
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
