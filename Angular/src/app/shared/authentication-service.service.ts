import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Entreprise } from '../model/entreprise';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private baseUrl_auth = 'http://localhost:8000/stage/auth/authenticate';
  private baseUrl_register = 'http://localhost:8000/stage/auth/register';
  private baseUrl_registerCitoyen = 'http://localhost:8000/stage/auth/registerCitoyen';

  constructor(private http: HttpClient,private cookieService: CookieService) { }

  register(Entreprise: Entreprise): Observable<any> {
    return this.http.post<Entreprise>(`${this.baseUrl_register}` ,Entreprise)
  }
  registerCitoyen(User: User): Observable<any> {
    return this.http.post<User>(`${this.baseUrl_registerCitoyen}` ,User)
  }
  login(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };
    return this.http.post<any>(`${this.baseUrl_auth}`, body);
  }
    roleMatch(role: string): boolean {
      var isMatch = false;
      var token = this.cookieService.get('token');
      if (token != null && token.length!=0) {
        var payLoad = JSON.parse(window.atob(token.split('.')[1]));
        var userRoles = payLoad.role as string[];
        console.log(payLoad.role);
        isMatch = userRoles.includes(role.toString());
      }

      return isMatch;
    }
}
