import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { QuestionService } from '../shared/question.service';
import { ReponseService } from '../shared/reponse.service';
import { ReponseuserService } from '../shared/reponseuser.service';
import { SharedAfficherReponseUserService } from '../shared/shared-afficher-reponse-user.service';
import { UserServiceService } from '../shared/user-service.service';
import { SondageService } from '../shared/sondage.service';
import { Sondage } from '../model/sondage';
import { Question } from '../model/question';
import { ParticipationService } from '../shared/participation.service';

@Component({
  selector: 'app-citoyen-interface',
  templateUrl: './citoyen-interface.component.html',
  styleUrls: ['./citoyen-interface.component.css']
})
export class CitoyenInterfaceComponent {
  constructor(private cookieService: CookieService, private router:Router,
    private participationService: ParticipationService,private route:ActivatedRoute){}

    questions:Question[]=[];
    sondages:Sondage[]=[];
    lienn:any;
    userId:any;
    questionID:any;





  ngOnInit(): void {
    this.participationService.getSondagesForUser()
      .subscribe((sondages: Sondage[]) => {
        this.sondages = sondages;
        console.log('Sondages pour l\'utilisateur : ', sondages);
      });
  }


  logout(): void {
    this.cookieService.delete('token');
    this.router.navigateByUrl('/authentication');
  }
}
