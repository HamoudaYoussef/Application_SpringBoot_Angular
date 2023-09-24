import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { gender } from '../model/gender';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl_getRandomUsers = 'http://localhost:8000/stage/User/randomUsers';
  private baseUrl_userOriginalId = 'http://localhost:8000/stage/User/userOriginalId'
  private baseUrl_findBy= 'http://localhost:8000/stage/User/filterBy'


  constructor(private cookieService:CookieService, private http:HttpClient) { }
  getAuthToken(): string {
    return this.cookieService.get('token');
}
getRandomUsers(sondageID:any): Observable<User[]> {
  return this.http.get<User[]>(`${this.baseUrl_getRandomUsers}/${sondageID}`);
}
getOriginalUserIdFromHashedId(hashedUserId: string): Observable<string> {
  const url = `${this.baseUrl_userOriginalId}/${hashedUserId}`;
  return this.http.get<string>(url);
}
filtrerParAge(minAge: number, maxAge: number): Observable<User[]> {
  return this.http.get<User[]>(`${this.baseUrl_findBy}/${minAge}/${maxAge}`);
}

filtrerParSexe(gender: gender): Observable<User[]> {
  return this.http.get<User[]>(`${this.baseUrl_findBy}/${gender}`);
}

}
