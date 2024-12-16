import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from './../../service/user-auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  username: string = '';
  password: string = '';
  invalidLogin = false;

  constructor(private router: Router, private authService: UserAuthService) {}

  checkLogin() {
    // Authenticate using the UserAuthService
    if (this.authService.authenticate(this.username, this.password)) {
      this.invalidLogin = false;
      // Redirect to a user dashboard after successful login
      this.router.navigate(['/krios']);  
    } else {
      this.invalidLogin = true;
      alert('Incorrect username or password.');
    }
  }
}
