import { AfterViewInit, Component , ElementRef, Input, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Question } from 'src/app/model/question';
import { Reponse } from 'src/app/model/reponse';
import { ReponseUser } from 'src/app/model/reponseUser';
import { Sondage } from 'src/app/model/sondage';
import { User } from 'src/app/model/user';
import { QuestionService } from 'src/app/shared/question.service';
import { ReponseService } from 'src/app/shared/reponse.service';
import { ReponseuserService } from 'src/app/shared/reponseuser.service';
import { SharedAfficherReponseUserService } from 'src/app/shared/shared-afficher-reponse-user.service';
import { SondageService } from 'src/app/shared/sondage.service';
import { UserServiceService } from 'src/app/shared/user-service.service';

@Component({
  selector: 'app-afficher-sondage',
  templateUrl: './afficher-sondage.component.html',
  styleUrls: ['./afficher-sondage.component.css']
})
export class AfficherSondageComponent{
  titre!:string;
  position!:number;
  sondage!: Sondage ;
  questions:Question[]=[];
  sondages:Sondage[]=[];
  reponsesA:Reponse[]=[] ;
  sondageId!: number ;
  reponse!:Reponse;
  lienn:any;
  userId:any;
  ouinon: boolean = true ;
  error: string = '';
  questionID:any;
  users: User[] = [];
  reponss!:ReponseUser;
  ids:any;
  originalUserId:any;
  reponseId:any;
  reponsesTemp: ReponseUser[] = [];



  constructor(private reponseSharedService: SharedAfficherReponseUserService,private sondageService: SondageService,private userService: UserServiceService,private route:ActivatedRoute,
    private questionService:QuestionService,private reponseService: ReponseService,private cookieService:CookieService,private reponseuserservice:ReponseuserService) {
      this.reponsesTemp = this.reponseSharedService.getReponsesTemp();
     }

  ngOnInit(): void {


    this.route.params.subscribe(params => {
      this.lienn = params['ids'];
      this.userId = params['idu'];
    });
    this.sondageService.getSondageByToken(this.lienn).subscribe(
      (data: Sondage) => {
        this.sondage = data;
        this.sondageService.getQuestionsBySondageId(this.sondage.id)
      .subscribe(
        questions => {
          console.log(this.sondage.id);
          this.questions = questions;
        },
        error => {
          console.error('Error loading questions:', error);
        }
      );
      },
      error => {
        console.error('Une erreur s\'est produite :', error);
      }
    );


  }
  fetchReponsesByQuestionId(questionId: any): void {
    console.log(questionId)
    this.reponseService.getReponsesByQuestionId(questionId).subscribe(
      (reponses: Reponse[]) => {
        this.reponsesA = reponses;
        console.log(this.reponsesA);
      },
      error => {
        console.error('Error loading reponses:', error);
      }
    );
  }

  saveReponses() {
    console.log(this.reponsesTemp)
    for (const response of this.reponsesTemp) {
      this.reponseuserservice.ajouter(response.question_id, response.userId, response.reponse_id, response.sondage_id)
        .subscribe(
          (response: ReponseUser) => {
            console.log(response)
            // Gérez la réponse ici
            console.log('Réponse ajoutée avec succès :', response);
          },
          (error: any) => {
            // Gérez les erreurs ici
            console.error('Erreur lors de l\'ajout de la réponse :', error);
          }
        );
    }

    // Après avoir ajouté toutes les réponses, vous pouvez vider la liste temporaire
  }


  /*addReponse(reponseId:number, questionId: any) {
    this.userService.getOriginalUserIdFromHashedId(this.userId).subscribe(
      originalUserId => {
        console.log('Original User ID:', originalUserId);
        this.reponseuserservice.ajouter(questionId, originalUserId,reponseId).subscribe(
          (response: ReponseUser) => {
            // Handle success, maybe show a success message or update your UI
          },
          (error: any) => {
            // Handle error, display an error message or take appropriate action
          }
        );
      },
      error => {
        console.error('Error fetching original user ID:', error);
      }
    );
  }*/
 /* ajouterReponse(questionId: number, originalUserId: any, p: number, reponseUser: ReponseUser) {
    this.reponseuserservice.ajouter(questionId, originalUserId, p, reponseUser).subscribe(
      response => {
        console.log('Réponse ajoutée :', response);
        // Effectuez d'autres actions si nécessaire
      },
      error => {
        console.error('Erreur lors de l\'ajout de la réponse :', error);
        // Gérez l'erreur
      }
    );
  }*/
  }

  // ... (autre code)



  /*addReponse() {
    this.yourService.addReponse(this.questionId, this.userId, this.reponseUser).subscribe(
      (response: ReponseUser) => {
        // Handle success, maybe show a success message or update your UI
      },
      (error: any) => {
        // Handle error, display an error message or take appropriate action
      }
    );
  }*/


