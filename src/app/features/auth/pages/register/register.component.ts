import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { RegisterData } from '@models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  registerData: RegisterData = {
    email: '',
    password: '',
    name: ''
  };

  errorMessage = '';
  isLoading = false;

  onSubmit(): void {
    if (!this.registerData.email || !this.registerData.password || !this.registerData.name) {
      this.errorMessage = 'Preencha todos os campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.registerData).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = 'Erro ao criar conta';
        this.isLoading = false;
      }
    });
  }
}
