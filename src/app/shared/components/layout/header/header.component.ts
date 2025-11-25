import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { CartService } from '@core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);

  currentUser = this.authService.currentUser;
  isAuthenticated = this.authService.isAuthenticated;
  isAdmin = this.authService.isAdmin;
  cartItemCount = this.cartService.itemCount;
  cartItems = this.cartService.items;
  cartTotal = this.cartService.total;
  
  showCartDropdown = signal(false);
  searchTerm = '';

  toggleCartDropdown(): void {
    this.showCartDropdown.update(value => !value);
  }

  closeCartDropdown(): void {
    this.showCartDropdown.set(false);
  }

  goToCart(): void {
    this.closeCartDropdown();
    this.router.navigate(['/cart']);
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  onSearch(): void {
    console.log('Buscando por:', this.searchTerm);
    if (this.searchTerm.trim()) {
      this.router.navigate(['/'], { 
        queryParams: { search: this.searchTerm.trim() }
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  onLogout(): void {
    this.authService.logout();
  }
}
