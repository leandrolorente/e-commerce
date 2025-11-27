import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tattoo } from '@models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TattooService {
  private readonly API_URL = `${environment.apiUrl}/tattoos`;

  constructor(private http: HttpClient) {}

  getTattoos(filters?: {
    bodyArea?: string;
    artistId?: string;
    style?: string;
    featured?: boolean;
    limit?: number
  }): Observable<Tattoo[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.bodyArea) params = params.set('bodyArea', filters.bodyArea);
      if (filters.artistId) params = params.set('artistId', filters.artistId);
      if (filters.style) params = params.set('style', filters.style);
      if (filters.featured !== undefined) params = params.set('featured', filters.featured.toString());
      if (filters.limit) params = params.set('limit', filters.limit.toString());
    }

    return this.http.get<Tattoo[]>(this.API_URL, { params });
  }

  getTattooById(id: string): Observable<Tattoo> {
    return this.http.get<Tattoo>(`${this.API_URL}/${id}`);
  }

  createTattoo(tattoo: Partial<Tattoo>): Observable<Tattoo> {
    return this.http.post<Tattoo>(this.API_URL, tattoo);
  }

  updateTattoo(id: string, tattoo: Partial<Tattoo>): Observable<Tattoo> {
    return this.http.patch<Tattoo>(`${this.API_URL}/${id}`, tattoo);
  }

  deleteTattoo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
