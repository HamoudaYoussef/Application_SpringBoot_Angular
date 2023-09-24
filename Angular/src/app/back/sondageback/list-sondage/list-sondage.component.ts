import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sondage } from 'src/app/model/sondage';
import { User } from 'src/app/model/user';
import { SondageService } from 'src/app/shared/sondage.service';
import { UserServiceService } from 'src/app/shared/user-service.service';

@Component({
  selector: 'app-list-sondage',
  templateUrl: './list-sondage.component.html',
  styleUrls: ['./list-sondage.component.css']
})
export class ListSondageComponent {
  sondages: Sondage[] = [];
  id!: any;
  sondageID:any;
  users:User[] = [];
  @Input() entrepriseId: any ; // Assurez-vous que le nom est correct
  nomSondageSelectionne: string | undefined;



  constructor( private sondageService:SondageService,private userService:UserServiceService,
     private router:Router, private route:ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
this.getSondagesByEntreprise();
  }
  getSondagesByEntreprise(){
    this.sondageService.findSondageByEntrepriseId(this.id).subscribe(
      (data) => {
        this.sondages = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des sondages', error);
      }
    );
  }

  onSondage(newSondageId:any){
    this.router.navigateByUrl(`/question/${newSondageId}`);
  }
  sendToUsers(newSondageId: any) {
    const sondage = this.sondages.find(s => s.id === newSondageId);
    if (sondage) {
      this.nomSondageSelectionne = sondage.nomsondage;
    }
                  this.openPopup()

    if (newSondageId) {
        this.userService.getRandomUsers(newSondageId).subscribe(
            (users: User[]) => {
                this.users = users; // Stocker les utilisateurs récupérés dans le tableau
            },
            (error) => {
                console.error('Erreur lors de la récupération des utilisateurs :', error);
            }
        );
    } else {
        console.error('newSondageId est null ou undefined.');
    }
}

deleteSondage(): void {
  if (this.sondageID) {
    this.closePopupS();
    this.openPopupsupS();

    this.sondageService.deleteSondage(this.sondageID).subscribe(
      () => {
        console.log('Sondage supprimé avec succès.');
        // Vous pouvez ajouter ici une redirection ou d'autres actions après la suppression.
      },
      (error) => {
        console.error('Erreur lors de la suppression du sondage : ', error);
      }
    );
  }
}


 openPopup() {
  const popup = document.getElementById("popup");
  if (popup) {
    popup.style.display = "block";
  }
}

// Ferme le popup
 closePopup() {
  const popup = document.getElementById("popup");
  if (popup) {
    popup.style.display = "none";
  }

}

openPopupS(sondageId: any) {
  this.sondageID = sondageId;
  const popupS = document.getElementById("popupS");
  if (popupS) {
    popupS.style.display = "block";
  }
}

// Ferme le popup
 closePopupS() {
  const popupS = document.getElementById("popupS");
  if (popupS) {
    popupS.style.display = "none";
  }

}

openPopupsupS() {
  const popupsupS = document.getElementById("popupsupS");
  if (popupsupS) {
    setTimeout(() => {
      this.closePopupsupS();
    }, 2000);
    popupsupS.style.display = "block";
    this.router.navigate(['/entreprise']).then(() => {
      window.location.reload();
    });  }
}

// Ferme le popup
 closePopupsupS() {
  const popupsupS = document.getElementById("popupsupS");
  if (popupsupS) {
    popupsupS.style.display = "none";
  }
}
}
