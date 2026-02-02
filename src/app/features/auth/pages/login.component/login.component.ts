import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login.component',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)

  errorMessage = signal<string | null>(null);

  loginForm = this.fb.nonNullable.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.minLength(6)],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.getRawValue()).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage.set(error.error.message);
        }
      })
    }
  }

}
