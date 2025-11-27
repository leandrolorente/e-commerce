import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { LoginCredentials } from '@models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  credentials: LoginCredentials = {
    email: '',
    password: ''
  };

  errorMessage = '';
  isLoading = false;

  onSubmit(): void {
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Preencha todos os campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login error:', error);
        if (error.status === 0) {
          this.errorMessage = 'Erro de conexão. Verifique se o backend está rodando em http://localhost:3000';
        } else if (error.status === 401) {
          this.errorMessage = 'Email ou senha inválidos';
        } else {
          this.errorMessage = error.error?.message || 'Erro ao fazer login. Tente novamente.';
        }
        this.isLoading = false;
      }
    });
  }
}
