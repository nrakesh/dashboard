import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service'; // Import the Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  // Inject the Router and AuthService
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  login(): void {
    this.authService.login();
  }
  /*
  onSubmit(): void {
    if (this.loginForm.valid) {
      // Get email and password from the form's value
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe(success => {
        if (success) {
          // If login is successful, navigate to the dashboard
          this.router.navigate(['/dashboard']);
        } else {
          // Handle login failure (e.g., show an error message)
          console.error('Login failed');
        }
      });
    }
  }
   */
}
