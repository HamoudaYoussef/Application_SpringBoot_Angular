import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Entreprise } from '../model/entreprise';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  constructor(private cookieService:CookieService, private http:HttpClient) { }
  private baseUrl_getAllEntreprise = 'http://localhost:8000/stage/Entreprise/findAllEntreprise';
  private baseUrl_getEntrepriseId = 'http://localhost:8000/stage/Entreprise/getEntrepriseById';
  private baseUrl_addPoints = 'http://localhost:8000/stage/Historique/ajouter';


  getAllEntreprises(): Observable<any> {
    return this.http.get(this.baseUrl_getAllEntreprise);
  }
  getEntrepriseById(id: number): Observable<Entreprise> {
    const url = `${this.baseUrl_getEntrepriseId}/${id}`;
    return this.http.get<Entreprise>(url);
  }
  getAuthToken(): string {
    return this.cookieService.get('token');
}
ajouterPoints(entrepriseId: number, points: number): Observable<string> {
  const url = `${this.baseUrl_addPoints}/${entrepriseId}/${points}`;
  return this.http.post<string>(url, null);
}

}
