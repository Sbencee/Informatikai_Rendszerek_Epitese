import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { Loans } from '../models/loans.model';

@Injectable({
  providedIn: 'root'
})
export class LoansService {

  constructor(private http: HttpClient) { }

  getLoans() {
    return lastValueFrom(this.http.get<Loans[]>('/api/loans'));
  }

  getLoan(id: number) {
    return lastValueFrom(this.http.get<Loans>(`/api/loans/${id}`));
  }  

  updateLoan(id: number, loan: Partial<Loans>): Observable<Loans> {
    return this.http.put<Loans>(`/api/loans/${id}`, loan);
  }
  
  createLoan(loans: Partial<Loans>) {
    return lastValueFrom(this.http.post<Loans>('/api/loans', loans));
  }

}