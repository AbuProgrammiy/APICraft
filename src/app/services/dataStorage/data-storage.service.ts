import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpClient: HttpClient) { }

  getColumnsByTableId(id:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl+"DataStorage/GetColumnsByTableId/"+id)
  }

  create(body: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + "DataStorage/Create", body)
  }
}
