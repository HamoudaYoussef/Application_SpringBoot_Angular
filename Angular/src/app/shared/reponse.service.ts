import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reponse } from '../model/reponse';
import { Observable } from 'rxjs';
import { Question } from '../model/question';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {

  private baseUrl_addReponse = 'http://localhost:8000/stage/reponse/addReponse';
  private baseUrl_deleteReponse = 'http://localhost:8000/stage/reponse/deleteReponse';
  private baseUrl_updateReponse = 'http://localhost:8000/stage/reponse/updateReponse';


  constructor(private http: HttpClient) { }

  addReponse(Reponse: Reponse,questionID:any): Observable<any> {
    return this.http.post<Reponse>(`${this.baseUrl_addReponse}/${questionID} `,Reponse)
  }
  getSQuestionById(questionId: number): Observable<Question> {
    const url = `http://localhost:8000/stage/auth/getSQuestionById/${questionId}`;
    return this.http.get<Question>(url);
  }

  getReponsesByQuestionId(questionId: any): Observable<Reponse[]> {
    const url = `http://localhost:8000/stage/reponse/reponse/${questionId}`;
    return this.http.get<Reponse[]>(url);
  }
  deleteReponse(reponseId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_deleteReponse}/${reponseId}`, { responseType: 'text' });
  }

  updateReponseTitre(reponseId: number, nouveauTitre: string): Observable<void> {
    const url = `${this.baseUrl_updateReponse}/${reponseId}/${nouveauTitre}`;
    return this.http.put<void>(url, {});
  }

}
