import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  isUserExists(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}User/IsUserExists/${id}`)
  }

  verifyUser(body:any):Observable<any>{
    return this.httpClient.post(environment.baseUrl+"User/SendVerificationToUser",body)
  }

  logIn(body:any):Observable<any>{
    return this.httpClient.post(environment.baseUrl+"User/LogIn",body)
  }

  register(body:any):Observable<any>{
    return this.httpClient.post(environment.baseUrl+"User/Register",body)
  }

  resetPassword(body:any):Observable<any>{
    return this.httpClient.post(environment.baseUrl+"User/ResetPassword",body)
  }

  updateEmail(body:any):Observable<any>{
    return this.httpClient.patch(environment.baseUrl+"User/UpdateEmail",body)
  }

  updatePassword(body:any):Observable<any>{
    return this.httpClient.patch(environment.baseUrl+"User/UpdatePassword",body)
  }
  
  updateSecurityKey(body:any):Observable<any>{
    return this.httpClient.patch(environment.baseUrl+"User/UpdateSecurityKey",body)
  }

  deleteUser(userId:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}User/Delete/${userId}`)
  }
}
