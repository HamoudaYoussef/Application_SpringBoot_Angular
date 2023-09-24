import { Component } from '@angular/core';
import { gender } from 'src/app/model/gender';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/shared/user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(private userService:UserServiceService){}

  
}
