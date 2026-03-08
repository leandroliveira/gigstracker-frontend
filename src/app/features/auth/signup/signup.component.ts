import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  signupForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  errorMessage = '';

  async onSubmit() {
    if (this.signupForm.valid) {
      const { email, password, confirmPassword } = this.signupForm.getRawValue();
      if (password !== confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      try {
        await this.authService.signup(email, password);
        this.router.navigate(['/dashboard']);
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = 'Signup failed';
        }
      }
    }
  }
}
