import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { Reponse } from 'src/app/model/reponse';
import { User } from 'src/app/model/user';
import { QuestionService } from 'src/app/shared/question.service';
import { ReponseService } from 'src/app/shared/reponse.service';
import { SondageService } from 'src/app/shared/sondage.service';
import { UserServiceService } from 'src/app/shared/user-service.service';

@Component({
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.css']
})
export class ReponseComponent {

  titre!:string;
  position!:number;
  error: string = '';
  users: User[] = [];
  id:any;
  q!:Question;
  ids:any;
  reponses: Reponse[] = [];
  questions: Question[] = [];
  isEditing = false;
  isHovered: boolean = false;





  @Input() questionId: any ; // Assurez-vous que le nom est correct
  @Input() question!: string; // Marquez la propriété comme nullable avec "!"



  constructor(private reponseService: ReponseService, private userService:UserServiceService,private route: ActivatedRoute ,private router:Router,
    private sondageService:SondageService){this.questionId = this.route.snapshot.params['id']

  }
  ngOnInit() {
    // Récupérer l'identifiant du sondage depuis l'URL
    this.sondageService.getLst().subscribe(
      (data: number) => {
        this.ids = data;
      },
      (error) => {
        console.error('Error fetching last Sondage ID:', error);
      }
    );
      console.log(this.questionId);
      this.reponseService.getSQuestionById(this.questionId).subscribe(
        (question: Question) => {
          this.q = question;

        },
        (error: any) => {
          console.error('Error fetching question:', error);
        }
      );
this.loadQuestions();


  }
  loadQuestions(): void {
    // Appelez un service pour charger les questions depuis la source de données
    this.reponseService.getReponsesByQuestionId(this.questionId).subscribe({
      next: reponses => {
        this.reponses = reponses;
      },
      error: error => {
        console.error('Erreur lors du chargement des questions:', error);
      }
    });
  }
  addReponse() {
    const newReponse: Reponse = {
      id:0,
      titre: this.titre,
      position:this.position,
      questionID:this.questionId
    };

    this.reponseService.addReponse(newReponse,this.questionId).subscribe({
      next: reponse => {
        console.log('reponse ajouté avec succès:', reponse);

        this.reponses.push(reponse);


        // Réinitialiser le formulaire
        this.titre='';
        this.position=1;
        this.error = '';
      },
      error: error => {
        console.error('Erreur lors de l\'ajout de la reponse:', error);
        this.error = 'Une erreur s\'est produite lors de l\'ajout de la reponse.';
      }
    });
  }
  acceuil(): void {
    this.router.navigateByUrl('/entreprise');
  }

  editTitre(): void {
    this.isEditing = true;
  }

  saveTitre(reponse: any): void {
    // Assurez-vous d'appeler la méthode de mise à jour du service avec l'ID de la réponse et le nouveau titre
    this.updateTitre(reponse.id, reponse.titre);
    this.isEditing = false;
  }

  updateTitre(reponseId: number, nouveauTitre: string): void {
    this.reponseService.updateReponseTitre(reponseId, nouveauTitre)
      .subscribe(() => {
        // La mise à jour a réussi, vous pouvez effectuer une action supplémentaire si nécessaire.
      }, error => {
        // Gérez les erreurs ici, par exemple en affichant un message d'erreur à l'utilisateur.
        console.error('Erreur lors de la mise à jour du titre de la réponse :', error);
      });
  }
  agrandirBloc() {
    this.isHovered = true;
  }

  retrecirBloc() {
    this.isHovered = false;
  }
onDeleteReponse(reponseId: number): void {
  this.closePopupRep();
  this.openPopupSup();
    this.reponseService.deleteReponse(reponseId).subscribe(

      () => {
        console.log('Réponse supprimée avec succès');
        // Mettez à jour votre interface utilisateur ou effectuez d'autres actions si nécessaire
        this.loadReponses();

      },
      (error) => {
        console.error('Erreur lors de la suppression de la réponse :', error);
        // Gérez l'erreur de suppression, affichez un message d'erreur à l'utilisateur, etc.
      }
    );
  }

   openPopupRep() {
    const popupRep = document.getElementById("popupRep");
    if (popupRep) {
      popupRep.style.display = "block";
    }
  }


  // Ferme le popup
   closePopupRep() {
    const popupRep = document.getElementById("popupRep");
    if (popupRep) {
      popupRep.style.display = "none";
    }
  }

  openPopupSup() {
    const popupsup = document.getElementById("popupsup");
    if (popupsup) {
      setTimeout(() => {
        this.closePopupSup();
      }, 2000);
      popupsup.style.display = "block";
    }
  }
  closePopupSup() {
    const popupsup = document.getElementById("popupsup");
    if (popupsup) {
      popupsup.style.display = "none";
    }
  }

 loadReponses(): void {
    // Appelez un service pour charger les questions depuis la source de données
    this.reponseService.getReponsesByQuestionId(this.q.id).subscribe({
      next: reponses => {
        this.reponses = reponses;
      },
      error: error => {
        console.error('Erreur lors du chargement des questions:', error);
      }
    });
  }

}
