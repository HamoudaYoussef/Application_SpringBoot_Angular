import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './front/userFront/register/register.component';
import { AuthenticationComponent } from './front/userFront/authentication/authentication.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { EntrepriseInterfaceComponent } from './entreprise-interface/entreprise-interface.component';
import { AuthGuard } from './utils/auth-guard';
import { CitoyenInterfaceComponent } from './citoyen-interface/citoyen-interface.component';
import { RegisterCitoyenComponent } from './front/userFront/register-citoyen/register-citoyen.component';
import { QuestionComponent } from './back/sondageback/question/question.component';
import { ReponseComponent } from './back/sondageback/reponse/reponse.component';
import { SondageComponent } from './back/sondageback/sondage/sondage.component';
import { AfficherSondageComponent } from './front/sondagefront/afficher-sondage/afficher-sondage.component';
import { AfficherSondageAdminComponent } from './back/sondageback/afficher-sondage-admin/afficher-sondage-admin.component';
import { FindhistoriquebyentrepriseComponent } from './back/historique/findhistoriquebyentreprise/findhistoriquebyentreprise.component';
import { FindAllEntrepriseComponent } from './back/entrepriseAll/find-all-entreprise/find-all-entreprise.component';
import { ListSondageComponent } from './back/sondageback/list-sondage/list-sondage.component';

const routes: Routes = [
{path :'authentication',component: AuthenticationComponent},
{path :'register',component: RegisterComponent},
{path :'registerC',component: RegisterCitoyenComponent},
{path :'question/:id',component: QuestionComponent},
{path :'reponse/:id',component: ReponseComponent},
{path :'history/:id',component: FindhistoriquebyentrepriseComponent},
{path :'sondage',component: SondageComponent},
{path :'findAllEntreprise',component:FindAllEntrepriseComponent},
{path :'afficher-sondage/:ids/:idu',component:AfficherSondageComponent},
{path :'afficher-sondage-admin/:id',component:AfficherSondageAdminComponent},
{path :'admin',component: AdminInterfaceComponent,canActivate:[AuthGuard],data:{permittedRole:"1"}},
{path :'entreprise',component: EntrepriseInterfaceComponent,canActivate:[AuthGuard],data:{permittedRole:"2"}},
{path :'citoyen',component: CitoyenInterfaceComponent,canActivate:[AuthGuard],data:{permittedRole:"3"}},
{path :'listSondage',component: ListSondageComponent,canActivate:[AuthGuard],data:{permittedRole:"2"}},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
