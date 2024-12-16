import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';  // Importing isPlatformBrowser

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  // Dummy authentication method
  authenticate(username: string, password: string): boolean {
    // Here you would call an API to validate the username and password.
    if (username === 'Rohit123' && password === '1234') {
      if (isPlatformBrowser(this.platformId)) {
        // Only use localStorage in the browser
        localStorage.setItem('authToken', 'some-jwt-token');  // Set token in localStorage
      }
      return true;
    } else {
      return false;
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');  // Example of removing a token from localStorage
    }
    this.router.navigate(['/user']);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Only access localStorage if in the browser
      return !!localStorage.getItem('authToken');
    }
    return false;
  }
}
