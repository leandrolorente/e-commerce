import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of } from 'rxjs';
import { User, LoginCredentials, RegisterData, AuthResponse, UserRole } from '@models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/api/auth';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  private currentUserSignal = signal<User | null>(this.getUserFromStorage());
  private isAuthenticatedSignal = signal<boolean>(this.hasValidToken());

  currentUser = this.currentUserSignal.asReadonly();
  isAuthenticated = this.isAuthenticatedSignal.asReadonly();
  isAdmin = computed(() => {
    const user = this.currentUserSignal();
    return user?.role === UserRole.ADMIN || user?.role === UserRole.MANAGER;
  });

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // Mock login para desenvolvimento
    return this.mockLogin(credentials);
    
    // Quando backend estiver pronto, descomente abaixo:
    // return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials)
    //   .pipe(
    //     tap(response => this.handleAuthSuccess(response)),
    //     catchError(error => {
    //       console.error('Login failed:', error);
    //       throw error;
    //     })
    //   );
  }

  register(data: RegisterData): Observable<AuthResponse> {
    // Mock register para desenvolvimento
    return this.mockRegister(data);
    
    // Quando backend estiver pronto, descomente abaixo:
    // return this.http.post<AuthResponse>(`${this.API_URL}/register`, data)
    //   .pipe(
    //     tap(response => this.handleAuthSuccess(response)),
    //     catchError(error => {
    //       console.error('Registration failed:', error);
    //       throw error;
    //     })
    //   );
  }

  // Mock login - Credenciais de teste:
  // Cliente: email: cliente@test.com, senha: 123456
  // Admin: email: admin@test.com, senha: admin123
  private mockLogin(credentials: LoginCredentials): Observable<AuthResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        if (credentials.email === 'admin@test.com' && credentials.password === 'admin123') {
          const response: AuthResponse = {
            user: {
              id: '1',
              name: 'Admin Tattoo',
              email: 'admin@test.com',
              role: UserRole.ADMIN,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            token: 'mock-admin-token-' + Date.now()
          };
          this.handleAuthSuccess(response);
          observer.next(response);
          observer.complete();
        } else if (credentials.email === 'cliente@test.com' && credentials.password === '123456') {
          const response: AuthResponse = {
            user: {
              id: '2',
              name: 'Cliente Teste',
              email: 'cliente@test.com',
              role: UserRole.CUSTOMER,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            token: 'mock-customer-token-' + Date.now()
          };
          this.handleAuthSuccess(response);
          observer.next(response);
          observer.complete();
        } else {
          observer.error({ error: { message: 'Email ou senha inválidos' } });
        }
      }, 500); // Simula latência de rede
    });
  }

  private mockRegister(data: RegisterData): Observable<AuthResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        const response: AuthResponse = {
          user: {
            id: Date.now().toString(),
            name: data.name,
            email: data.email,
            role: UserRole.CUSTOMER,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          token: 'mock-token-' + Date.now()
        };
        this.handleAuthSuccess(response);
        observer.next(response);
        observer.complete();
      }, 500);
    });
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSignal.set(null);
    this.isAuthenticatedSignal.set(false);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private handleAuthSuccess(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    this.currentUserSignal.set(response.user);
    this.isAuthenticatedSignal.set(true);
  }

  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  private hasValidToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
