import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historique } from '../model/historique';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  private baseUrl_getHistoriqueByEntrepriseId = 'http://localhost:8000/stage/Historique/findHistoriquesByEntreprise_Id';

  constructor(private http:HttpClient) { }

  getHistoriqueByEntrepriseId(id: number): Observable<Historique[]> {
    const url = `${this.baseUrl_getHistoriqueByEntrepriseId}/${id}`;
    return this.http.get<Historique[]>(url);
  }
}
