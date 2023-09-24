import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sondage } from '../model/sondage';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  constructor(private http: HttpClient,private userService:UserServiceService) { }

  getSondagesForUser() {
    const authToken = this.userService.getAuthToken();
    const headers = {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    };
    const options = { headers: headers };
    const url = `http://localhost:8000/stage/Participation/getSondagesByUser`;
    return this.http.get<Sondage[]>(url,options);  }

}
