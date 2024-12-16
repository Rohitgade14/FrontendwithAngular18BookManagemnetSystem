import { UserAuthService } from './service/user-auth.service';
import { Component } from '@angular/core';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], 
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css'], 
})
export class AppComponent {
  title = 'BookManagementSystem';
  constructor(private router: Router, private authService: UserAuthService) {}
 
  logout() {
    // Clear user authentication data (e.g., localStorage, sessionStorage, or JWT token)
    this.authService.logout();

    // Navigate to the login page after logout
    this.router.navigate(['/user']);
  }
}
