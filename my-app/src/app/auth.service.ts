import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (this.isLoggedIn()) {
      return true;
    }
    // If not logged in, redirect to the login page
    this.router.navigate(['/login']);
    return false;
  }

  private isLoggedIn(): boolean {
    // Replace with actual user authentication logic
    const token = localStorage.getItem('token');
    return !!token; // Convert truthy/falsy to boolean
  }
}
