import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {

  url = 'https://viacep.com.br/ws'

  constructor(private http: HttpClient) { }

  get(cep: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${cep}/json`);
  }

  get1(cep: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${cep}/json`).pipe(take(1));
  }

  get2(cep: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${cep}/json`);
  }

  get3(cep: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${cep}/json`);
  }
}
