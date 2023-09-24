import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './front/userFront/register/register.component';
import { AuthenticationComponent } from './front/userFront/authentication/authentication.component';
import { EntrepriseInterfaceComponent } from './entreprise-interface/entreprise-interface.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CitoyenInterfaceComponent } from './citoyen-interface/citoyen-interface.component';
import { RegisterCitoyenComponent } from './front/userFront/register-citoyen/register-citoyen.component';
import { QuestionComponent } from './back/sondageback/question/question.component';
import { SondageComponent } from './back/sondageback/sondage/sondage.component';
import { ReponseComponent } from './back/sondageback/reponse/reponse.component';
import { AfficherSondageComponent } from './front/sondagefront/afficher-sondage/afficher-sondage.component';
import { AfficherSondageAdminComponent } from './back/sondageback/afficher-sondage-admin/afficher-sondage-admin.component';
import { FindhistoriquebyentrepriseComponent } from './back/historique/findhistoriquebyentreprise/findhistoriquebyentreprise.component';
import { FindAllEntrepriseComponent } from './back/entrepriseAll/find-all-entreprise/find-all-entreprise.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UserComponent } from './back/user/user.component';
import { ListSondageComponent } from './back/sondageback/list-sondage/list-sondage.component';
import { SidebarComponent } from './back/sondageback/sidebar/sidebar.component';
import { ReponseuserComponent } from './front/sondagefront/reponseuser/reponseuser.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AuthenticationComponent,
    EntrepriseInterfaceComponent,
    AdminInterfaceComponent,
    CitoyenInterfaceComponent,
    RegisterCitoyenComponent,
    QuestionComponent,
    SondageComponent,
    ReponseComponent,
    AfficherSondageComponent,
    AfficherSondageAdminComponent,
    FindhistoriquebyentrepriseComponent,
    FindAllEntrepriseComponent,
    UserComponent,
    ListSondageComponent,
    SidebarComponent,
    ReponseuserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    DialogModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
