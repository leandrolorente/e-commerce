import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Testimonial } from '@models';
import { Tattoo } from '../../../models/interfaces/tattoo.interface';
import { TattooService } from '../../../core/services/tattoo.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private http = inject(HttpClient);
  private tattooService = inject(TattooService);
  private apiUrl = environment.apiUrl;

  // GET /api/tattoos (featured) - usando TattooService
  getFeaturedTattoos(): Observable<Tattoo[]> {
    return this.tattooService.getTattoos({ featured: true, limit: 6 });
  }

  // GET /api/products (featured)
  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products?featured=true&limit=6`);
  }

  // GET /api/reviews (or testimonials endpoint)
  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${this.apiUrl}/reviews?featured=true&limit=6`);
  }

  // GET /api/studio/stats
  getStudioStats(): Observable<{
    yearsExperience: number;
    satisfiedClients: number;
    artistsCount: number;
    awardsCount: number;
  }> {
    return this.http.get<{
      yearsExperience: number;
      satisfiedClients: number;
      artistsCount: number;
      awardsCount: number;
    }>(`${this.apiUrl}/studio/stats`);
  }
}
