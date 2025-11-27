import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { CartService } from '@core/services/cart.service';
import { ProductService } from '@core/services/product.service';
import { Product } from '@models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private router = inject(Router);

  currentUser = this.authService.currentUser;
  isAuthenticated = this.authService.isAuthenticated;
  isAdmin = this.authService.isAdmin;
  cartItemCount = this.cartService.itemCount;
  cartItems = this.cartService.items;
  cartTotal = this.cartService.total;

  showCartDropdown = signal(false);
  showSearchDropdown = signal(false);
  showMobileMenu = signal(false);
  searchTerm = '';
  searchSuggestions = signal<Product[]>([]);

  onSearchInput(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (term.length < 2) {
      this.searchSuggestions.set([]);
      this.showSearchDropdown.set(false);
      return;
    }

    // Buscar produtos no backend
    this.productService.getProducts({ search: term, limit: 5 }).subscribe({
      next: (response) => {
        const products = response.products || [];
        this.searchSuggestions.set(products);
        this.showSearchDropdown.set(products.length > 0);
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
        this.searchSuggestions.set([]);
        this.showSearchDropdown.set(false);
      }
    });
  }

  selectSuggestion(product: Product): void {
    this.searchTerm = '';
    this.showSearchDropdown.set(false);
    this.router.navigate(['/products', product.id]);
  }

  closeSearchDropdown(): void {
    setTimeout(() => {
      this.showSearchDropdown.set(false);
    }, 200);
  }

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
    this.showSearchDropdown.set(false);
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

  toggleMobileMenu(): void {
    this.showMobileMenu.update(value => !value);
  }

  closeMobileMenu(): void {
    this.showMobileMenu.set(false);
  }
}
