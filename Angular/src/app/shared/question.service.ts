import { Injectable } from '@angular/core';
import { Question } from '../model/question';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl_addQuestion = 'http://localhost:8000/stage/auth/createQuestion';
  private baseUrl_lastAddedQuestionId = 'http://localhost:8000/stage/auth/last-added-question-id';
  private baseUrl_updateQuestionTitre = 'http://localhost:8000/stage/auth/updateQuestion';
  private baseUrl_deleteQuestion = 'http://localhost:8000/stage/auth/deleteQuestion';



  constructor(private http: HttpClient) { }

  addQuestion(Question: Question,sondageID:any): Observable<any> {
  /*  const sondageId = Question.sondage;*/
    return this.http.post<Question>(`${this.baseUrl_addQuestion}/${sondageID}`, Question);
  }
  getLastAddedQuestionId(): Observable<number> {
    return this.http.get<number>(this.baseUrl_lastAddedQuestionId);
  }

  updateQuestionTitre(questionId: number, nouveauTitre: string): Observable<void> {
    const url = `${this.baseUrl_updateQuestionTitre}/${questionId}/${nouveauTitre}`;
    return this.http.put<void>(url, {});
  }
  deleteQuestion(questionId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_deleteQuestion}/${questionId}`, { responseType: 'text' });
  }

}
