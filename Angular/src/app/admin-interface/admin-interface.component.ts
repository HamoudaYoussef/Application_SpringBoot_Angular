import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SondageService } from '../shared/sondage.service';
import { Sondage } from '../model/sondage';


@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.css']
})
export class AdminInterfaceComponent {
  sondages!: Sondage[];


  constructor(private cookieService: CookieService, private router:Router,private sondageService:SondageService) { }
  ngOnInit(): void {
    this.sondageService.getAllSondages().subscribe(
      res=>{

       this.sondages=res;

      }

          )
  }
  logout(): void {
    this.cookieService.delete('token');
    this.router.navigateByUrl('/authentication');
  }

  suivant(Id:any){
    console.log(Id);
    this.router.navigateByUrl(`/afficher-sondage-admin/${Id}`);
  }
  entreprise(){
    this.router.navigateByUrl(`/findAllEntreprise`);
  }
}
