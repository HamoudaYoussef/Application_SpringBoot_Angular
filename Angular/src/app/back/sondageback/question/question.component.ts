import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { QuestionService } from 'src/app/shared/question.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/model/user';
import { gender } from 'src/app/model/gender';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { SondageService } from 'src/app/shared/sondage.service';
import { Sondage } from 'src/app/model/sondage';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent {
  genders = [gender.Male, gender.Female];


  titre: string = '';
  nomSondage: string = '';
  desc: string = '';
  sondageID: any;
  sondage!: Sondage;
  sondages: Sondage [] = [];
  error: string = '';
  questions: Question[] = [];
  newquestionId!: number;
  showReponseForm: boolean = false;
  minAge!: number;
  maxAge!: number;
  nbP: number = 0;
  gender!: gender ;
  users: User[] = [];
  selectedAgeRange!: string ; // Sélectionnez une valeur par défaut
  nomSondageSelectionne: string | undefined;
  selectedGender!: gender;

  plagesAge = [
    { id: 1, label: '18-23',  minAge: 18, maxAge: 23  },
    { id: 2, label: '23-30',  minAge: 23, maxAge: 30  },
    { id: 3, label: '30-45',  minAge: 30, maxAge: 45  },
    { id: 4, label: '45-60',  minAge: 45, maxAge: 60  },
    { id: 5, label: '60-80',  minAge: 60, maxAge: 80  },
    { id: 6, label: 'Toutes',  minAge: 18, maxAge: 80  }


  ];
  selectedPlageAge!: number; // id de la plage d'âge "18-25"
  hovering: boolean = false; // Variable pour gérer le survol de la souris
  inputClicked: boolean = false;

  isEditingQ = false;



  constructor(private questionService: QuestionService,private sondageService: SondageService,private route: ActivatedRoute, private router:Router,
    private modalService: BsModalService , private userService: UserServiceService, // Injectez BsModalService ici
    private renderer: Renderer2, private el: ElementRef ){/*this.sondage = this.route.snapshot.params['id']*/}
 ngOnInit() {

    // Récupérer l'identifiant du sondage depuis l'URL
     this.route.paramMap.subscribe(params => {
      this.sondageID = params.get('id');

    });
    this.sondageService.getSondageById(this.sondageID).subscribe((sondage) => {
      this.sondage = sondage;
      this.nomSondage = sondage.nomsondage;  // Assuming you have a 'nom' property in your Sondage model
      this.desc = sondage.description;
      this.minAge = sondage.minage;
      this.maxAge = sondage.maxage;
      this.nbP = sondage.nbr_participant;
      this.selectedAgeRange = `${this.minAge}-${this.maxAge}`;
      this.selectedGender = sondage.gender;


    });
this.loadQuestions();
  }

  editTitreQ(): void {
    this.isEditingQ = true;
  }


  saveTitreQ(reponse: any): void {
    // Assurez-vous d'appeler la méthode de mise à jour du service avec l'ID de la réponse et le nouveau titre
    this.updateQuestionTitre(reponse.id, reponse.titre);
    this.isEditingQ = false;
  }


  setSelectedGender(gender: gender) {
    this.selectedGender = this.gender
  }

goToList(){
  this.router.navigateByUrl('/entreprise');
}
  loadQuestions(): void {
    // Appelez un service pour charger les questions depuis la source de données
    this.sondageService.getQuestionsBySondageId(this.sondageID).subscribe({
      next: questions => {
        this.questions = questions;
      },
      error: error => {
        console.error('Erreur lors du chargement des questions:', error);
      }
    });
  }
  updateQuestionTitre(questionId: number, nouveauTitre: string): void {
    this.questionService.updateQuestionTitre(questionId, nouveauTitre)
      .subscribe(() => {
        // La mise à jour a réussi, vous pouvez effectuer une action supplémentaire si nécessaire.
      }, error => {
        // Gérez les erreurs ici, par exemple en affichant un message d'erreur à l'utilisateur.
        console.error('Erreur lors de la mise à jour du titre de la réponse :', error);
      });
  }

  addQuestion() {
    const newQuestion: Question = {
      id:0,
      titre: this.titre,
      sondage: this.sondage,

    };

    this.questionService.addQuestion(newQuestion,this.sondageID).subscribe({
      next: question => {
        console.log('question ajouté avec succès:', question);

        this.questions.push(question);

        // Réinitialiser le formulaire
        this.titre = '';
        this.showReponseForm = true;

        //this.error = '';
        this.suivant();
      },
      error: error => {
        console.error('Erreur lors de l\'ajout de la question:', error);
        this.error = 'Une erreur s\'est produite lors de l\'ajout de la question.';
      }
    });
  }
  showQuestion() {
    this.hovering = true;
  }

  // Fonction pour masquer le champ de texte lorsque la souris quitte
  hideQuestion() {
    this.hovering = false;
  }

  toggleTextarea() {
    this.inputClicked = !this.inputClicked;
  }
  suivant(){
    // Call the getLastAddedSondageId() method to get the last added survey ID
    this.questionService.getLastAddedQuestionId().subscribe({
     next: newquestionId => {
       console.log('ID du sondage ajouté:', newquestionId);
       this.newquestionId = newquestionId;

       // Navigate to the "question" page with the newSondageId in the URL
     },
     error: error => {
       console.error('Erreur lors de la récupération de l\'ID du question:', error);
     }
   });
  }

  acceuil(): void {
    this.router.navigateByUrl('/entreprise');
  }


  filtrerParAge(minAge: number, maxAge: number) {
    this.userService.filtrerParAge(minAge, maxAge)
      .subscribe((resultat: User[]) => {
        this.users = resultat;
      });
  }

  filtrerParSexe(gender: gender) {
    this.userService.filtrerParSexe(gender)
      .subscribe((resultat: User[]) => {
        this.users = resultat;
      });
  }

  filtrer() {
    if (this.minAge && this.maxAge && this.gender) {
      // Si les trois critères sont définis (âge minimum, âge maximum et sexe), effectuez le filtrage par les deux critères.
      this.filtrerParAge(this.minAge, this.maxAge);
      this.filtrerParSexe(this.gender);
    } else if (this.minAge && this.maxAge) {
      // Si seulement les critères d'âge sont définis, effectuez le filtrage par âge.
      this.filtrerParAge(this.minAge, this.maxAge);
    } else if (this.gender) {
      // Si seulement le critère de sexe est défini, effectuez le filtrage par sexe.
      this.filtrerParSexe(this.gender);
    } else {
      // Aucun critère n'est défini, affichez un message d'erreur ou effectuez une action par défaut.
      console.log("Aucun critère de filtrage sélectionné.");
    }
  }
  ajouterParticipantEtCritique() {
    const ageRangeParts = this.selectedAgeRange.split('-');
    this.minAge = parseInt(ageRangeParts[0]);
    this.maxAge = parseInt(ageRangeParts[1]);
    const genderValue = this.selectedGender || gender.Male;
    this.sondageService.addParticipantEtCrit(this.sondageID, this.nbP, this.minAge, this.maxAge, genderValue,this.nomSondage,this.desc).subscribe(

      response => {
        console.log('Mise à jour réussie', response);
        this.nbP ;
        this.minAge
        this.maxAge
        this.gender
        this.nomSondage
        this.desc
      },
      error => {
        console.error('Erreur lors de la mise à jour', error);
      }
    );

      }

sendToUsers( ) {
    this.openPopup(); // Afficher la pop-up
    // Reste du code pour récupérer les utilisateurs
    // ...
        // Remplacer par l'ID réel
        this.ajouterParticipantEtCritique();
        this.userService.getRandomUsers(this.sondageID).subscribe(
          (users: User[]) => {
            this.users = users; // Stocker les utilisateurs récupérés dans le tableau
          },
          (error) => {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
          }
        );
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

      openPopupQ(questionId: number) {
        const popupQ = document.getElementById("popupQ");
        if (popupQ) {
          console.log('ID de la question à supprimer :', questionId);
          popupQ.style.display = "block";
        }
      }

      // Ferme le popup
       closePopupQ() {
        const popupQ = document.getElementById("popupQ");
        if (popupQ) {
          popupQ.style.display = "none";
        }
      }
      openPopupSupQ() {
        const popupsupQ = document.getElementById("popupsupQ");
        if (popupsupQ) {
          setTimeout(() => {
            this.closePopupSupQ();
          }, 2000);
          popupsupQ.style.display = "block";
        }
      }
      closePopupSupQ() {
        const popupsupQ = document.getElementById("popupsupQ");
        if (popupsupQ) {
          popupsupQ.style.display = "none";
        }
      }
      onDeleteQuestion(questionId: number): void {
        this.closePopup();
        this.openPopupSupQ();
          this.questionService.deleteQuestion(questionId).subscribe(

            () => {
              console.log('Réponse supprimée avec succès');
              // Mettez à jour votre interface utilisateur ou effectuez d'autres actions si nécessaire
              this.loadQuestions();

            },
            (error) => {
              console.error('Erreur lors de la suppression de la réponse :', error);
              // Gérez l'erreur de suppression, affichez un message d'erreur à l'utilisateur, etc.
            }
          );
        }

        

}






