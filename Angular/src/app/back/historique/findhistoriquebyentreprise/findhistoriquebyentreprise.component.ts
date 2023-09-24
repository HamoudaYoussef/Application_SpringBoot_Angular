import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Historique } from 'src/app/model/historique';
import { HistoriqueService } from 'src/app/shared/historique.service';

@Component({
  selector: 'app-findhistoriquebyentreprise',
  templateUrl: './findhistoriquebyentreprise.component.html',
  styleUrls: ['./findhistoriquebyentreprise.component.css']
})
export class FindhistoriquebyentrepriseComponent {
  historiques!: Historique[] ;
  entreprise:any;

  constructor(private historiqueService: HistoriqueService,  private route: ActivatedRoute){this.entreprise = this.route.snapshot.params['id']}

  ngOnInit(): void {
    const entrepriseId = this.entreprise; // Remplacez par l'ID de l'entreprise souhaitée
    this.historiqueService.getHistoriqueByEntrepriseId(entrepriseId)
      .subscribe(
        (data: Historique[]) => {
          this.historiques = data;
          console.log('Historique récupéré :', this.historiques);
        },
        error => {
          console.error('Une erreur s\'est produite :', error);
        }
      );
  }



}
