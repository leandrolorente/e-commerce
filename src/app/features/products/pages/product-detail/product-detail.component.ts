import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FooterComponent } from '@shared/components/layout/footer/footer.component';
import { ProductService } from '@core/services/product.service';
import { CartService } from '@core/services/cart.service';
import { Product, Review } from '@models';
import { MOCK_REVIEWS, MOCK_PRODUCTS } from '@core/services/mock-data';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product = signal<Product | null>(null);
  currentImageIndex = signal(0);
  quantity = signal(1);
  addedToCart = signal(false);
  
  reviews = signal<Review[]>([]);
  
  currentImage = computed(() => {
    const p = this.product();
    const idx = this.currentImageIndex();
    return p?.images[idx] || '';
  });

  averageRating = computed(() => {
    const revs = this.reviews();
    if (revs.length === 0) return 0;
    return revs.reduce((sum, r) => sum + r.rating, 0) / revs.length;
  });

  ratingDistribution = computed(() => {
    const revs = this.reviews();
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    revs.forEach(r => {
      dist[r.rating as keyof typeof dist]++;
    });
    return dist;
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(id);
      this.loadReviews(id);
    }
  }

  private loadProduct(id: string): void {
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    if (product) {
      this.product.set(product);
    } else {
      console.error('Produto não encontrado:', id);
      this.router.navigate(['/']);
    }
  }

  private loadReviews(productId: string): void {
    const productReviews = MOCK_REVIEWS.filter(r => r.productId === productId);
    this.reviews.set(productReviews);
  }

  selectImage(index: number): void {
    this.currentImageIndex.set(index);
  }

  nextImage(): void {
    const p = this.product();
    if (p) {
      const next = (this.currentImageIndex() + 1) % p.images.length;
      this.currentImageIndex.set(next);
    }
  }

  prevImage(): void {
    const p = this.product();
    if (p) {
      const prev = (this.currentImageIndex() - 1 + p.images.length) % p.images.length;
      this.currentImageIndex.set(prev);
    }
  }

  incrementQuantity(): void {
    const p = this.product();
    if (p && this.quantity() < p.stock) {
      this.quantity.update(q => q + 1);
    }
  }

  decrementQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  addToCart(): void {
    const p = this.product();
    if (p) {
      this.cartService.addToCart(p, this.quantity());
      this.addedToCart.set(true);
      setTimeout(() => this.addedToCart.set(false), 2000);
    }
  }

  buyNow(): void {
    this.addToCart();
    this.router.navigate(['/cart']);
  }

  getStarArray(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  }

  getRatingPercentage(star: number): number {
    const dist = this.ratingDistribution();
    const total = this.reviews().length;
    if (total === 0) return 0;
    return (dist[star as keyof typeof dist] / total) * 100;
  }
}
