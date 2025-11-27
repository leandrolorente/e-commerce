import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductFilter, ProductListResponse } from '@models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API_URL = `${environment.apiUrl}/products`;

  private productsSignal = signal<Product[]>([]);
  private loadingSignal = signal<boolean>(false);

  products = this.productsSignal.asReadonly();
  loading = this.loadingSignal.asReadonly();
  productCount = computed(() => this.productsSignal().length);

  constructor(private http: HttpClient) {}

  getProducts(filter?: ProductFilter, page: number = 1, pageSize: number = 20): Observable<ProductListResponse> {
    let params = new HttpParams();

    // Se tiver featured ou limit, retorna array direto (homepage)
    if (filter?.search) {
      params = params.set('search', filter.search);
    }
    if (filter?.limit) {
      params = params.set('limit', filter.limit.toString());
    }
    if (filter?.category) {
      params = params.set('category', filter.category);
    }

    // Se não for busca da homepage, adiciona paginação
    if (!filter?.limit) {
      params = params.set('page', page.toString());
      params = params.set('pageSize', pageSize.toString());
    }

    if (filter) {
      if (filter.minPrice) params = params.set('minPrice', filter.minPrice.toString());
      if (filter.maxPrice) params = params.set('maxPrice', filter.maxPrice.toString());
      if (filter.searchTerm) params = params.set('search', filter.searchTerm);
      if (filter.sortBy) params = params.set('sortBy', filter.sortBy);
      if (filter.sortOrder) params = params.set('sortOrder', filter.sortOrder);
    }

    this.loadingSignal.set(true);
    return this.http.get<ProductListResponse>(this.API_URL, { params });
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Observable<Product> {
    return this.http.post<Product>(this.API_URL, product);
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  searchProducts(searchTerm: string): Observable<Product[]> {
    const params = new HttpParams().set('search', searchTerm);
    return this.http.get<Product[]>(`${this.API_URL}/search`, { params });
  }
}
