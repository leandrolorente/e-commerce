import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '@shared/components/layout/header/header.component';
import { FooterComponent } from '@shared/components/layout/footer/footer.component';
import { ProductService } from '@core/services/product.service';
import { CartService } from '@core/services/cart.service';
import { Product } from '@models';
import { MOCK_PRODUCTS } from '@core/services/mock-data';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  products: Product[] = [];
  loading = false;
  addedToCart: Set<string> = new Set();
  imageIndices: Map<string, number> = new Map();

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    // Simulando chamada API com timeout
    setTimeout(() => {
      this.products = MOCK_PRODUCTS;
      // Inicializar índices de imagens
      this.products.forEach(p => this.imageIndices.set(p.id, 0));
      this.loading = false;
    }, 800);
  }

  getCurrentImageIndex(productId: string): number {
    return this.imageIndices.get(productId) || 0;
  }

  nextImage(productId: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const product = this.products.find(p => p.id === productId);
    if (product) {
      const current = this.imageIndices.get(productId) || 0;
      const next = (current + 1) % product.images.length;
      this.imageIndices.set(productId, next);
    }
  }

  prevImage(productId: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const product = this.products.find(p => p.id === productId);
    if (product) {
      const current = this.imageIndices.get(productId) || 0;
      const prev = (current - 1 + product.images.length) % product.images.length;
      this.imageIndices.set(productId, prev);
    }
  }

  setImageIndex(productId: string, index: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.imageIndices.set(productId, index);
  }

  addToCart(product: Product, event: Event): void {
    event.stopPropagation();
    this.cartService.addToCart(product, 1);
    this.addedToCart.add(product.id);
    
    // Remove feedback visual após 2 segundos
    setTimeout(() => {
      this.addedToCart.delete(product.id);
    }, 2000);
  }

  getDiscountPercentage(product: Product): number {
    if (!product.discountPrice) return 0;
    return Math.round(((product.price - product.discountPrice) / product.price) * 100);
  }
}
