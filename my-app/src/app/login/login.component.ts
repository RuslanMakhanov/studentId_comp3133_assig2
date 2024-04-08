import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Inject the Router into the constructor
  constructor(private router: Router) { }

  // Method to call when the user submits the login form
  login() {
    // Perform login logic here, and upon success:
    this.router.navigate(['/employees']);
  }
}
