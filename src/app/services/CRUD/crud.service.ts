import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private httpClient: HttpClient) { }

  getAll(securityKey: string, tableName: string, page: number, count: number): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}CRUD/GetAll/${securityKey}/${tableName}${page != undefined && page != null && count != undefined && count != null ? `?page=${page}&count=${count}` : ""}`)
  }

  getByAny(securityKey: string, tableName: string, columnName: string, columnValue: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}CRUD/GetByAny/${securityKey}/${tableName}/${columnName}${columnValue!=undefined&&columnValue!=null?`/${columnValue}`:""}`)
  }

  create(securityKey: string, tableName: string, body: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}CRUD/Create/${securityKey}/${tableName}`, body, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  updateByAny(securityKey: string, tableName: string, columnName: string, columnValue: string, body: string): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}CRUD/UpdateByAny/${securityKey}/${tableName}/${columnName}${columnValue!=undefined&&columnValue!=null?`/${columnValue}`:""}`, body, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  deleteByAny(securityKey: string, tableName: string, columnName: string, columnValue: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}CRUD/DeleteByAny/${securityKey}/${tableName}/${columnName}${columnValue!=undefined&&columnValue!=null?`/${columnValue}`:""}`)
  }
}
