import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  private url: string = 'https://localhost:7105/api/AzureStorageAccount/';

  constructor(private http: HttpClient) { }

  public getItems(): Observable<string[]>{
    return this.http.get<string[]>(this.url + 'blobItem/images').pipe(take(1));
  }
}
