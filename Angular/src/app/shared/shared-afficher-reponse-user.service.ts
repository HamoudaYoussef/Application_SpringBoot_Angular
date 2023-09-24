import { Injectable } from '@angular/core';
import { ReponseUser } from '../model/reponseUser';

@Injectable({
  providedIn: 'root'
})
export class SharedAfficherReponseUserService {

  private reponsesTemp: ReponseUser[] = [];

  constructor() {}

  // Méthode pour ajouter une réponse à la liste temporaire
  addReponse(response: ReponseUser) {
    const existingResponseIndex = this.reponsesTemp.findIndex(
      (reponse) => reponse.question_id === response.question_id
    );

    if (existingResponseIndex !== -1) {
      // Si une réponse avec le même questionId existe, la supprimer
      this.reponsesTemp.splice(existingResponseIndex, 1);
    }

    // Ajouter la nouvelle réponse
    this.reponsesTemp.push(response);
  }

  deleteReponse() {
    if (this.reponsesTemp.length > 0) {
      this.reponsesTemp.pop(); // Supprime le dernier élément
    }  }

  // Méthode pour obtenir la liste temporaire
  getReponsesTemp(): ReponseUser[] {
    return this.reponsesTemp;
  }

  // Méthode pour vider la liste temporaire
  clearReponsesTemp() {
    this.reponsesTemp = [];
  }}
