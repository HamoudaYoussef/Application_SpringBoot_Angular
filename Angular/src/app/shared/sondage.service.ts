import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sondage } from '../model/sondage';
import { Observable, catchError, throwError } from 'rxjs';
import { Entreprise } from '../model/entreprise';
import { EntrepriseService } from './entreprise.service';
import { Question } from '../model/question';
import { gender } from '../model/gender';

@Injectable({
  providedIn: 'root'
})
export class SondageService {
  private baseUrl='http://localhost:8000/stage/auth';
  private baseUrlUpdate='http://localhost:8000/stage/auth/updateSondage';
  private baseUrl_addSondage = 'http://localhost:8000/stage/auth/createSondage';
  private baseUrl_lastAddedSondageId = 'http://localhost:8000/stage/auth/last-added-sondage-id';
  private baseUrl_AllSondages = 'http://localhost:8000/stage/auth/getAllSondages';
  private baseUrl_SondageByToken = 'http://localhost:8000/stage/auth/getSondageByToken';
  private baseUrl_sondageOriginalId = 'http://localhost:8000/stage/auth/sondageOriginalId';
  private baseUrl_getLst = 'http://localhost:8000/stage/auth/getLst';
  private baseUrl_addParticipantEtCrit = 'http://localhost:8000/stage/auth/addParticipantEtCrit';
  private baseUrl_findSondageByEntrepriseId = 'http://localhost:8000/stage/auth/findSondageByEntrepriseId';
  private baseUrl_addNameDesc = 'http://localhost:8000/stage/auth/addNomDesc'
  private baseUrl_deletSondage = 'http://localhost:8000/stage/auth/deleteSondage'



  constructor(private http: HttpClient,private entrepriseService:EntrepriseService) { }

  addSondage(Sondage: Sondage): Observable<any> {
    const authToken = this.entrepriseService.getAuthToken();
    const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
    };
    const options = { headers: headers };
    return this.http.post<Sondage>(`${this.baseUrl_addSondage}` ,Sondage, options)
  }
  getLastAddedSondageId(): Observable<any> {
    return this.http.get<any>(this.baseUrl_lastAddedSondageId);
  }
 /* getLastAddedSondageId(): Observable<any> {
    return this.http.get<any>(this.baseUrl_lastAddedSondageId);
  }*/
  getSondageById(id: number): Observable<Sondage> {
    const url = `${this.baseUrl}/getSondageById/${id}`;
    return this.http.get<Sondage>(url);
  }
  getSondageByToken(lienn: number): Observable<Sondage> {
    const url = `${this.baseUrl_SondageByToken}/${lienn}`;
    return this.http.get<Sondage>(url);
  }

  getQuestionsBySondageId(sondageID: any): Observable<Question[]> {
    const url = `${this.baseUrl}/getSQuestionBySondageById/${sondageID}`;
    return this.http.get<Question[]>(url);
  }
  getAllSondages(): Observable<any> {
    return this.http.get(this.baseUrl_AllSondages);
  }
  updateSondage( sondage: Sondage,idSondage: number): Observable<any> {
    const url = `${this.baseUrlUpdate}/${idSondage}`;
    return this.http.put<Sondage>(`${this.baseUrlUpdate}/${idSondage}`, sondage);
   /* const url = `${this.baseUrlUpdate}/${idSondage}`;
    const headers = { 'Content-Type': 'application/json' }; // Définissez le type de contenu
    return this.http.put<Sondage>(url, sondage, { headers }); */
  }
  getOriginalSondageIdFromHashedId(hashedSondageId: string): Observable<string> {
    const url = `${this.baseUrl_sondageOriginalId}/${hashedSondageId}`;
    return this.http.get<string>(url);
  }

  getLst(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl_getLst}`);
  }

  addParticipantEtCrit(sondageId: any, nbP: number, minAge: number, maxAge: number, gender: gender, nomSondage: string, desc: string): Observable<any> {
    const authToken = this.entrepriseService.getAuthToken();
    const headers = {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    };
    const options = { headers: headers };
    const url = `${this.baseUrl_addParticipantEtCrit}/${sondageId}/${nbP}/${minAge}/${maxAge}/${gender}/${nomSondage}/${desc}`;
    return this.http.put<any>(url, {}, options);
  }

  findSondageByEntrepriseId(id: any): Observable<Sondage[]> {
    const authToken = this.entrepriseService.getAuthToken();
    const headers = {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    };
    const options = { headers: headers };
    return this.http.get<Sondage[]>(`${this.baseUrl_findSondageByEntrepriseId}`,options);
  }


  deleteSondage(sondageId: any): Observable<void> {
    const url = `${this.baseUrl_deletSondage}/${sondageId}`;
    return this.http.delete<void>(url);
  }
}
