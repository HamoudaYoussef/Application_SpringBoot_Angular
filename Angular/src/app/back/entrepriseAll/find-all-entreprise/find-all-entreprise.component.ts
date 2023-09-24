import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entreprise } from 'src/app/model/entreprise';
import { EntrepriseService } from 'src/app/shared/entreprise.service';

@Component({
  selector: 'app-find-all-entreprise',
  templateUrl: './find-all-entreprise.component.html',
  styleUrls: ['./find-all-entreprise.component.css']
})
export class FindAllEntrepriseComponent {

entreprises!: Entreprise[];
points: number = 0;
message: string = '';


  constructor( private entrepriseService:EntrepriseService, private router:Router, private route:ActivatedRoute) { }


  ngOnInit(): void {
    this.entrepriseService.getAllEntreprises().subscribe(
      res=>{
       this.entreprises=res;
      }
          )
  }
  ajouterPoints(entrepriseId: number, points: number): void {
    this.entrepriseService.ajouterPoints(entrepriseId, points)
      .subscribe(response => {
        console.log('Points ajoutés :', response);
      }, error => {
        console.error('Erreur lors de l\'ajout des points :', error);
      });
  }

  onHistory(entrepriseId:any){
    this.router.navigateByUrl(`/history/${entrepriseId}`);
   }

   /*ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const entrepriseId = Number(params.get('id'));
      this.entrepriseService.getEntrepriseById(entrepriseId)
        .subscribe(entreprise => {
          this.entreprise = entreprise;
        });
    });
  }*/

  }

