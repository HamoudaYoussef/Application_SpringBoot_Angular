import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationResponse } from 'src/app/model/AuthenticationResponse';
import { AuthenticationServiceService } from 'src/app/shared/authentication-service.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  email!: string;
  password!: string;
  error!: string;
  entrepriseId:any;
  lienn:any;
  userId:any

  constructor(private authService: AuthenticationServiceService, private router: Router, private cookieService: CookieService,private route: ActivatedRoute) {}
  ngOnInit(): void {
    /*this.route.paramMap.subscribe(params => {
      this.entrepriseId = params.get('id');
    });*/
  }
  signup(){
    this.router.navigateByUrl('/register');
   }
   signupC(){
    this.router.navigateByUrl('/registerC');
   }
  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (result: any) => {



        if (result && result.token) {
          this.cookieService.set('token', result.token, 1, '/', 'localhost', true, 'Lax');
        }
        if (this.authService.roleMatch("1")) {
          this.router.navigateByUrl('/admin');
        } else if (this.authService.roleMatch("2")) {
          this.router.navigateByUrl('/entreprise');
        } else if (this.authService.roleMatch("3")) {
          this.router.navigateByUrl('/citoyen');
        }
      },
      (err) => {
        console.log('error occured!');
      }
    );
  }


}
