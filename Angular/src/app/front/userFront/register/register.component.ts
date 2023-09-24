import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/model/user';
import { AuthenticationServiceService } from 'src/app/shared/authentication-service.service';
import { Observable } from 'rxjs';
import { Entreprise } from 'src/app/model/entreprise';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  companyname: string = '';
  email: string = '';
  password: string = '';
  points: number = 0;
  enabled: boolean = false;
  error: string = '';

  constructor(private authService: AuthenticationServiceService, private cookieService: CookieService, private router: Router) { }
  login(){

    this.router.navigateByUrl('/authentication');
   }
  Register() {
    const newEntreprise: Entreprise = {
      id:0,
      companyname: this.companyname,
      email: this.email,
      password: this.password,
      points: this.points,
      enabled : this.enabled

    };
      this.router.navigateByUrl('/authenticate');

    this.authService.register(newEntreprise).subscribe({
      next: user => {
        console.log('Utilisateur ajouté avec succès:', user);

        // Réinitialiser le formulaire
        this.cookieService.set('token', user.token, 1, '/', 'localhost', true, 'Lax');
        this.companyname = '';
        this.email = '';
        this.password = '';
        this.points = 0;
        this.enabled = false;
        this.error = '';
        this.openPopupSupQ();

      },
      error: error => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        this.error = 'Une erreur s\'est produite lors de l\'inscription.';
      }
    });
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
    this.router.navigateByUrl('/authentication')
  }

}
