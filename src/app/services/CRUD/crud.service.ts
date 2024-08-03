import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private httpClient:HttpClient) { }

  getAll(securityKey:string, tableName:string, page:number,count:number):Observable<any>{
    console.log(environment.baseUrl+`CRUD/GetAll/${securityKey}/${tableName}${page!=undefined&&page!=null&&count!=undefined&&count!=null?`?page=${page}&count=${count}`:""}`);
    return this.httpClient.get(environment.baseUrl+`CRUD/GetAll/${securityKey}/${tableName}${page!=undefined&&page!=null&&count!=undefined&&count!=null?`?page=${page}&count=${count}`:""}`)
  }
}
