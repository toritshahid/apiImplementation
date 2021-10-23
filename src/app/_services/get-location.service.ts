import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '../shared/getLocation';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { JobSearchResult, JobSkillEntity } from '../shared/getJobSearchResult';
import { User } from '../shared/user';
@Injectable({
  providedIn: 'root'
})
export class GetLocationService {
  apiURL = 'http://api.concoursedeals.com';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  getLocation(): Observable<Location> {
    return this.http.get<Location>(this.apiURL + '/api/v1.0/PostingJob/GetLocation')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getJobResults(loc: String, jobType: String): Observable<JobSearchResult> {
    return this.http.get<JobSearchResult>('http://www.sixdev.xyz/api/v1.0/PostingJob/SearchJobInLocation/Pune/Android Developer')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>('http://www.sixdev.xyz/api/v1.0/SignUp/SignUp', JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  handleError(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
