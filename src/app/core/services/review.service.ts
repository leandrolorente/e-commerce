import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  productId: string;
  createdAt: Date;
  user?: {
    id: string;
    name: string;
  };
  product?: {
    id: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/reviews`;

  // GET /api/reviews/:productId
  getProductReviews(productId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/${productId}`);
  }

  // GET /api/reviews?featured=true&limit=6
  getFeaturedReviews(limit: number = 6): Observable<Review[]> {
    const params = new HttpParams()
      .set('featured', 'true')
      .set('limit', limit.toString());
    return this.http.get<Review[]>(this.apiUrl, { params });
  }
}
