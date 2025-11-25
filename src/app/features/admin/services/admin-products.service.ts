import { Injectable, signal } from '@angular/core';
import { Product } from '../../../models/interfaces/product.interface';
import { ProductCategory } from '../../../models/enums/product-category.enum';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {
  private products = signal<Product[]>([
    {
      id: '1',
      name: 'Pomada Cicatrizante Premium',
      description: 'Pomada especializada para cicatrização de tatuagens, com ingredientes naturais',
      price: 45.90,
      category: ProductCategory.CUIDADOS,
      images: ['assets/products/pomada1.jpg'],
      stock: 50,
      rating: 4.8,
      reviewCount: 124,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Protetor Solar FPS 50',
      description: 'Proteção solar especial para tatuagens, previne desbotamento',
      price: 59.90,
      discountPrice: 49.90,
      category: ProductCategory.CUIDADOS,
      images: ['assets/products/protetor.jpg'],
      stock: 30,
      rating: 4.9,
      reviewCount: 89,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01')
    },
    {
      id: '3',
      name: 'Camiseta Guarana Tatto - Preta',
      description: 'Camiseta 100% algodão com logo do estúdio',
      price: 79.90,
      category: ProductCategory.VESTUARIO,
      images: ['assets/products/camiseta.jpg'],
      stock: 25,
      rating: 4.7,
      reviewCount: 45,
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-03-10')
    }
  ]);

  getProducts(): Observable<Product[]> {
    return of([...this.products()]).pipe(delay(300));
  }

  getProductById(id: string): Observable<Product | undefined> {
    return of(this.products().find(p => p.id === id)).pipe(delay(200));
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Observable<Product> {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.products.update(products => [...products, newProduct]);
    return of(newProduct).pipe(delay(500));
  }

  updateProduct(id: string, updates: Partial<Product>): Observable<Product> {
    let updatedProduct: Product | undefined;
    
    this.products.update(products => 
      products.map(p => {
        if (p.id === id) {
          updatedProduct = { ...p, ...updates, updatedAt: new Date() };
          return updatedProduct;
        }
        return p;
      })
    );
    
    return of(updatedProduct!).pipe(delay(500));
  }

  deleteProduct(id: string): Observable<boolean> {
    this.products.update(products => products.filter(p => p.id !== id));
    return of(true).pipe(delay(300));
  }

  updateStock(id: string, quantity: number): Observable<Product> {
    return this.updateProduct(id, { stock: quantity });
  }
}
