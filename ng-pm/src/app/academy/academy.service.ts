import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Course } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class AcademyService {
  constructor(private http: HttpClient, @Inject('baseUrl') private baseUrl: string) {}

  getAll(): Observable<Course[]> {
    const url = `${this.baseUrl}/courses`;
    return this.http.get<Course[]>(url).pipe(catchError(this.handleError('getAll', [])));
  }

  getCourse(id: number): Observable<Course> {
    const url = `${this.baseUrl}/courses/${id}`;
    return this.http.get<Course>(url).pipe(catchError(this.handleError<Course>('getCourses')));
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
