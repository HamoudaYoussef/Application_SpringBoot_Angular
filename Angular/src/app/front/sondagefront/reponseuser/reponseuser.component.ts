import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { Reponse } from 'src/app/model/reponse';
import { ReponseUser } from 'src/app/model/reponseUser';
import { User } from 'src/app/model/user';
import { ReponseService } from 'src/app/shared/reponse.service';
import { ReponseuserService } from 'src/app/shared/reponseuser.service';
import { SharedAfficherReponseUserService } from 'src/app/shared/shared-afficher-reponse-user.service';
import { SondageService } from 'src/app/shared/sondage.service';
import { UserServiceService } from 'src/app/shared/user-service.service';

@Component({
  selector: 'app-reponseuser',
  templateUrl: './reponseuser.component.html',
  styleUrls: ['./reponseuser.component.css']
})
export class ReponseuserComponent {
  titre!:string;
  position!:number;
  error: string = '';
  users: User[] = [];
  id:any;
  q!:Question;
  ids:any;
  idu:any;
  reponses: Reponse[] = [];
  questions: Question[] = [];
  isEditing = false;
  isHovered: boolean = false;
  userId:any;
  lienn:any;
  reponsesTemp: ReponseUser[] = [];

  isClicked = false;
  selectedResponse: number | null = null;


  @Input() questionId: any ; // Assurez-vous que le nom est correct
  @Input() question!: string; // Marquez la propriété comme nullable avec "!"

  constructor(private reponseService: ReponseService, private userService:UserServiceService,private route: ActivatedRoute ,private router:Router,
    private sondageService:SondageService,private reponseuserservice:ReponseuserService,private sharedAfficherReponse:SharedAfficherReponseUserService){this.questionId = this.route.snapshot.params['id']

  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.lienn = params['ids'];
      this.userId = params['idu'];
    });
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

  addReponse(reponseId: number, questionId: any, index: number) {
    this.userService.getOriginalUserIdFromHashedId(this.userId).subscribe(
      originalUserId => {
        console.log('Original User ID:', originalUserId);
        // Ajoutez la réponse à la liste temporaire
        const newResponse: ReponseUser = {
          question_id: questionId,
          userId: originalUserId,
          reponse_id: reponseId,
          sondage_id: this.ids
        };
        this.toggleClick(index);
        this.sharedAfficherReponse.addReponse(newResponse);
        console.log(this.sharedAfficherReponse.getReponsesTemp());
      },
      error => {
        console.error('Erreur lors de la récupération de l\'ID d\'utilisateur original:', error);
      }
    );
    return this.reponsesTemp
  }

  deleteReponse(reponseId: number, questionId: any, index: number) {
    this.userService.getOriginalUserIdFromHashedId(this.userId).subscribe(
      originalUserId => {
        console.log('Original User ID:', originalUserId);
        // Ajoutez la réponse à la liste temporaire
        const newResponse: ReponseUser = {
          question_id: questionId,
          userId: originalUserId,
          reponse_id: reponseId,
          sondage_id: this.ids
        };
        this.toggleClick(index);
        this.sharedAfficherReponse.addReponse(newResponse);
        console.log(this.sharedAfficherReponse.getReponsesTemp());
      },
      error => {
        console.error('Erreur lors de la récupération de l\'ID d\'utilisateur original:', error);
      }
    );
    return this.reponsesTemp
  }

  toggleClick(index: number) {
    if (this.selectedResponse === index) {
      this.selectedResponse = null;  // Si c'était déjà sélectionné, désélectionnez
    } else {
      this.selectedResponse = index;  // Sinon, sélectionnez le nouvel élément
    }
  }

  getReponseTemp(){
    return this.reponsesTemp
  }







}
