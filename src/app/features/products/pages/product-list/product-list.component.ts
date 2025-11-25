import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FooterComponent } from '@shared/components/layout/footer/footer.component';
import { ProductService } from '@core/services/product.service';
import { CartService } from '@core/services/cart.service';
import { Product } from '@models';
import { MOCK_PRODUCTS } from '@core/services/mock-data';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);

  products: Product[] = [];
  allProducts: Product[] = [];
  loading = false;
  addedToCart: Set<string> = new Set();
  imageIndices: Map<string, number> = new Map();
  searchTerm = '';

  ngOnInit(): void {
    // Observar mudanças nos parâmetros de busca
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      if (this.allProducts.length > 0) {
        this.filterProducts();
      }
    });
    
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    // Simulando chamada API com timeout
    setTimeout(() => {
      this.allProducts = MOCK_PRODUCTS;
      // Aplicar filtro inicial baseado nos query params atuais
      const currentParams = this.route.snapshot.queryParams;
      this.searchTerm = currentParams['search'] || '';
      this.filterProducts();
      // Inicializar índices de imagens
      this.allProducts.forEach(p => this.imageIndices.set(p.id, 0));
      this.loading = false;
    }, 800);
  }

  filterProducts(): void {
    if (!this.searchTerm.trim()) {
      this.products = this.allProducts;
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.products = this.allProducts.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
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
