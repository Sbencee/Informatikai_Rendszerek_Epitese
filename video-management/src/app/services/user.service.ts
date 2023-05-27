import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'http://localhost:3000'; // Update the base URL here

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/api/user`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Failed to get users.');
      })
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/user/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Failed to get user.');
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/api/user/${user.id}`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Failed to update user.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        return throwError(errorMessage);
      })
    );
  }
  
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/api/user`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Failed to create user.');
      })
    );
  }

  searchUser(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/api/user/search`, {
      params: {
        search: query
      }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Failed to search users.');
      })
    );
  }
}
