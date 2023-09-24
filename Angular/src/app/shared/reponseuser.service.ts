import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReponseUser } from '../model/reponseUser';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ReponseuserService {

  private baseUrl = 'http://localhost:8000'; // Mettez l'URL correcte de votre API backend
  private baseUrlEnvoyer ='http://localhost:8000/stage/reponseuser/envoyer'
  constructor(private http: HttpClient) { }

 /* addReponse(questionId: number, originalUserId: any,reponseUser:number): Observable<String> {
    const url = `http://localhost:8000/stage/reponseuser/addReponse/${questionId}/${originalUserId}/${reponseUser}`;
    return this.http.post<String>(url, null);
  }*/

  ajouter(questionId: number, originalUserId: any, reponseId: number, sondage_id: any): Observable<ReponseUser> {
    const url = `http://localhost:8000/stage/reponseuser/addReponse/${questionId}/${originalUserId}/${reponseId}/${sondage_id}`;
    return this.http.post<ReponseUser>(url,{});
  }

  envoyerReponses(reponses: ReponseUser[]): Observable<ReponseUser[]> {
    return this.http.post<ReponseUser[]>(`${this.baseUrlEnvoyer}`, reponses);
  }

}
