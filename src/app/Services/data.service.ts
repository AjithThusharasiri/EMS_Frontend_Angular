import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private BASE_URL = 'http://localhost:8080/api/v1/employee/';

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}getAllEmployees`);
  }

  saveEmployee(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}saveEmployee`, data, { responseType: 'text' });
    console.log(data);
  }
}
