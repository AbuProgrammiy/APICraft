import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private httpClient: HttpClient) { }

  isTableNameExistsByUserId(userId:string,tableName:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}Table/IsTableNameExistsByUserId/${userId}/${tableName}`)
  }

  create(body: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + "Table/Create", body)
  }

  truncateTableByUserId(userId:string,tableName:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}Table/TruncateTableByUserId/${userId}/${tableName}`)
  }

  deleteByUserId(userId:string,tableName:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}Table/DeleteTableByUserId/${userId}/${tableName}`)
  }
}
