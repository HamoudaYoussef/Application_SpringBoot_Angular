import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SondageService } from '../shared/sondage.service';
import { Sondage } from '../model/sondage';
import { Entreprise } from '../model/entreprise';
import { AuthenticationResponse } from '../model/AuthenticationResponse';
import { gender } from '../model/gender';
import { Participation } from '../model/participation';

@Component({
  selector: 'app-entreprise-interface',
  templateUrl: './entreprise-interface.component.html',
  styleUrls: ['./entreprise-interface.component.css']
})
export class EntrepriseInterfaceComponent {

  constructor(private cookieService: CookieService,private sondageService:SondageService, private router:Router,private route: ActivatedRoute) { }
  entrepriseId!: any ;
  entreprise!: Entreprise;
  sondages: Sondage[] = [];
  critere: string = '';
  nbr_participant: number = 0;
  lien: string = '';
  cout: number = 0;
  minAge: number = 0;
  maxAge: number = 0;
  gender: gender = gender.Male;
  error: string = '';
  nomsondage: string = '';
  description: string = '';
  participations!:Participation[]
  ngOnInit(): void {
  this.getSondagesByEntreprise();
}
sidebarVisible = false;

toggleSidebar() {
  this.sidebarVisible = !this.sidebarVisible;
}
  logout(): void {
    this.cookieService.delete('token');
    this.router.navigateByUrl('/authentication');
  }

  getSondagesByEntreprise(){
    this.sondageService.findSondageByEntrepriseId(this.entrepriseId).subscribe(
      (data) => {
        this.sondages = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des sondages', error);
      }
    );
  }


  public getCompanyNameFromCookie(): string {
    var token = this.cookieService.get("token");
    if (token != null && token.length != 0) {
      var payLoad = JSON.parse(window.atob(token.split('.')[1]));
      var companyname = payLoad.companyname as string;
      return companyname;
    }
    return "";
  }



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

  suivant() {
    this.sondageService.getLastAddedSondageId().subscribe({
      next: (response: AuthenticationResponse) => {
        const newSondageId = response.id;
        const newSondageToken = response.token;

        this.cookieService.set('tokens', newSondageToken, 1, '/', 'localhost', true, 'Lax');
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
