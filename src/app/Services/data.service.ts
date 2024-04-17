import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Inject, Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private BASE_URL = 'http://localhost:8080/api/v1/employee/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}getAllEmployees`);
  }

  saveEmployee(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}saveEmployee`, data, {
      responseType: 'text',
    });
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}searchEmployee/${id}`);
  }

  updateEmployee(data: any): Observable<any> {
    console.log(data);
    return this.http.put<any>(`${this.BASE_URL}updateEmployee`, data, {
      responseType: 'json',
    });
  }

  deleteEmployee(id: any) {
    return this.http.delete<any>(`${this.BASE_URL}deleteEmployee/${id}`);
  }
}
