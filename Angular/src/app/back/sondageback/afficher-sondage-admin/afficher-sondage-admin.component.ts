import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { Reponse } from 'src/app/model/reponse';
import { Sondage } from 'src/app/model/sondage';
import { User } from 'src/app/model/user';
import { QuestionService } from 'src/app/shared/question.service';
import { ReponseService } from 'src/app/shared/reponse.service';
import { SondageService } from 'src/app/shared/sondage.service';
import { UserServiceService } from 'src/app/shared/user-service.service';

@Component({
  selector: 'app-afficher-sondage-admin',
  templateUrl: './afficher-sondage-admin.component.html',
  styleUrls: ['./afficher-sondage-admin.component.css']
})
export class AfficherSondageAdminComponent {
  sondage!: Sondage ;
  questions:Question[]=[];
  reponses?:Reponse[] ;
  sondageId: number = 35;
  reponse!:Reponse;
  ouinon: boolean = true ;
  error: string = '';
  questionID:any;
  ID:any;
  users: User[] = [];
  constructor(private sondageService: SondageService,private questionService:QuestionService,private userService: UserServiceService,private reponseService: ReponseService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ID = params.get('id');
    });
    const id = this.ID; // Remplacez par l'ID du sondage que vous souhaitez récupérer
    this.sondageService.getSondageById(id).subscribe(
      (data: Sondage) => {
        this.sondage = data;
      },
      error => {
        console.error('Une erreur s\'est produite :', error);
      }
    );
    this.loadQuestions();
  }
  loadQuestions(): void {
    this.sondageService.getQuestionsBySondageId(this.sondageId)
      .subscribe(
        questions => {
          this.questions = questions;

        },
        error => {
          console.error('Error loading questions:', error);
        }
      );
  }

  updateSondage( sondage: Sondage,idSondage: number) {
    console.log(sondage, idSondage);
    this.sondageService.updateSondage(sondage, idSondage).subscribe(
      response => {
        console.log('Sondage mis à jour avec succès', response);
        // Traitez la réponse comme vous le souhaitez
      },
      error => {
        console.error('Erreur lors de la mise à jour du sondage', error);
        // Gérez l'erreur comme vous le souhaitez
      }
    );
  }
  fetchRandomUsers(id:any): void {
    const IdSondage = id; // Remplacer par l'ID réel
    this.userService.getRandomUsers(IdSondage).subscribe(
      (users: User[]) => {
        this.users = users; // Stocker les utilisateurs récupérés dans le tableau
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    );
  }
  acceuil(): void {
    this.router.navigateByUrl('/admin');
  }
}
