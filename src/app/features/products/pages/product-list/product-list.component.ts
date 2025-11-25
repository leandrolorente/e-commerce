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

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    // Simulando chamada API com timeout
    setTimeout(() => {
      this.products = MOCK_PRODUCTS;
      this.loading = false;
    }, 800);
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
