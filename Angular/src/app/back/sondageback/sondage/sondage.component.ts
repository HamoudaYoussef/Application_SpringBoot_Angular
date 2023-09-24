import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationResponse } from 'src/app/model/AuthenticationResponse';
import { SondageResponse } from 'src/app/model/SondageResponse';
import { Entreprise } from 'src/app/model/entreprise';
import { gender } from 'src/app/model/gender';
import { Participation } from 'src/app/model/participation';
import { Sondage } from 'src/app/model/sondage';
import { SondageService } from 'src/app/shared/sondage.service';

@Component({
  selector: 'app-sondage',
  templateUrl: './sondage.component.html',
  styleUrls: ['./sondage.component.css']
})
export class SondageComponent {
  critere: string = '';
  nbr_participant: number = 0;
  lien: string = '';
  entreprise:any;
  cout: number = 0;
  minAge: number = 0;
  maxAge: number = 0;
  gender: gender = gender.Female;
  error: string = '';
  nomsondage: string = '';
  description: string = '';
  participations!:Participation[]

  ngOnInit() {
  this.addSondage();
  }

  constructor(private sondageService: SondageService, private router:Router,private cookieService:CookieService){}
  addSondage() {
    const newSondage: Sondage = {
      id: 0,
      critere: this.critere,
      entreprise: this.entreprise,
      nbr_participant: this.nbr_participant,
      lien: this.lien,
      cout: this.cout,
      minage: this.minAge,
      maxage: this.maxAge,
      gender: this.gender,
      nomsondage :this.nomsondage,
      description :this.description,
      participations: this.participations

    };



    this.sondageService.addSondage(newSondage).subscribe({
      next: newSondage => {

        console.log('Sondage ajouté avec succès:', newSondage);
        // Get the ID of the newly added sondage
        const newSondageId = newSondage.id;
        console.log('ID du sondage ajouté:', newSondageId);

        // Navigate to the "question" page with the newSondageId in the URL
        //this.router.navigateByUrl(/question/${newSondageId});

        // Réinitialiser le formulaire
        this.critere = "";
        this.nbr_participant = 0;
        this.suivant();

      },
      error: error => {
        console.error('Erreur lors de l\'ajout de la réponse:', error);
        this.error = 'Une erreur s\'est produite lors de l\'ajout de la réponse.';
      }
    });

  }
    acceuil(): void {
    this.router.navigateByUrl('/entreprise');
  }
 /*suivant(){
   // Call the getLastAddedSondageId() method to get the last added survey ID
   this.sondageService.getLastAddedSondageId().subscribe({
    next: newSondageId => {
      console.log('ID du sondage ajouté:', newSondageId);

      // Navigate to the "question" page with the newSondageId in the URL
      this.router.navigateByUrl(/question/${newSondageId});
    },
    error: error => {
      console.error('Erreur lors de la récupération de l\'ID du sondage:', error);
    }
  });
 }*/
 suivant() {
  this.sondageService.getLastAddedSondageId().subscribe({
    next: (response: SondageResponse) => {
      const newSondageId = response.id;
      this.cookieService.set('token', response.tokens, 3, '/', 'localhost', true, 'Lax');

      console.log('ID du sondage ajouté:', newSondageId);

      // Navigate to the "question" page with the newSondageId in the URL
      this.router.navigateByUrl(`/question/${newSondageId}`);
    },
    error: error => {
      console.error('Erreur lors de la récupération de l\'ID du sondage:', error);
    }
  });
}


}
