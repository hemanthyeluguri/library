import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loans } from '../models/loans';

@Injectable({
  providedIn: 'root',
})
export class LoansService {
  private baseUrl = 'http://localhost:8082/api/loans'; // replace with your backend URL

  constructor(private http: HttpClient) {}

  getLoans(): Observable<Loans[]> {
    return this.http.get<Loans[]>(this.baseUrl);
  }

  createLoan(loans: Loans): Observable<Loans> {
    return this.http.post<Loans>(this.baseUrl, loans);
  }

  updateLoan(loansId: number, loans: Loans): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${loansId}`, loans);
  }

  updateLoanStatus(loansId: number, status: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${loansId}/status`, { status });
  }

  deleteLoan(loansId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${loansId}`);
  }
}
