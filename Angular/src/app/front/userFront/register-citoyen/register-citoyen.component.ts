import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { gender } from 'src/app/model/gender';
import { User } from 'src/app/model/user';
import { AuthenticationServiceService } from 'src/app/shared/authentication-service.service';

@Component({
  selector: 'app-register-citoyen',
  templateUrl: './register-citoyen.component.html',
  styleUrls: ['./register-citoyen.component.css']
})
export class RegisterCitoyenComponent {

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  age: number = 0;
  password: string = '';
  gender: gender= gender.Female;
  error: string = '';

  constructor(private authService: AuthenticationServiceService, private cookieService: CookieService, private router: Router) { }
  login(){
    this.router.navigateByUrl('/authentication');
   }
  Register() {
    const newUser: User = {
      id:0,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      age: this.age,

      gender: this.gender
    };
   this.router.navigateByUrl('/authentication')
    this.authService.registerCitoyen(newUser).subscribe({
      next: user => {
        console.log('Utilisateur ajouté avec succès:', user);

        // Réinitialiser le formulaire
        this.cookieService.set('token', user.token, 1, '/', 'localhost', true, 'Lax');
        this.firstname = '';
        this.lastname = '';
        this.email = '';
        this.password = '';
        this.error = '';
        this.gender = gender.Female;
        this.age = 0;

      },
      error: error => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        this.error = 'Une erreur s\'est produite lors de l\'inscription.';
      }
    });
  }
}
