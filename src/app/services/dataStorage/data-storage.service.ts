import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpClient: HttpClient) { }

  getColumnsByTableName(userId:string,tableName:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}DataStorage/GetColumnsByTableName/${userId}/${tableName}`)
  }

  create(body: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + "DataStorage/Create", body)
  }
}
