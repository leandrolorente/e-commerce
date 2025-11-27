import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface BookingAdmin {
  id: string;
  userId: string;
  artistId: string;
  tattooId?: string;
  date: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  artist?: {
    id: string;
    name: string;
    specialty: string;
  };
  tattoo?: {
    id: string;
    name: string;
    images: string[];
  };
}

export interface BookingFilter {
  status?: string;
  artistId?: string;
  startDate?: string;
  endDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminBookingService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/bookings`;

  // GET /api/bookings (admin - lista todos)
  getAllBookings(filter?: BookingFilter): Observable<BookingAdmin[]> {
    let params = new HttpParams();

    if (filter) {
      if (filter.status) {
        params = params.set('status', filter.status);
      }
      if (filter.artistId) {
        params = params.set('artistId', filter.artistId);
      }
      if (filter.startDate) {
        params = params.set('startDate', filter.startDate);
      }
      if (filter.endDate) {
        params = params.set('endDate', filter.endDate);
      }
    }

    return this.http.get<BookingAdmin[]>(this.apiUrl, { params });
  }

  // GET /api/bookings/:id (admin)
  getBookingById(id: string): Observable<BookingAdmin> {
    return this.http.get<BookingAdmin>(`${this.apiUrl}/${id}`);
  }

  // PATCH /api/bookings/:id (admin - atualizar status)
  updateBookingStatus(id: string, status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'): Observable<BookingAdmin> {
    return this.http.patch<BookingAdmin>(`${this.apiUrl}/${id}`, { status });
  }

  // DELETE /api/bookings/:id (admin)
  deleteBooking(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  // Estatísticas de agendamentos
  getBookingStats(): Observable<{
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  }> {
    return this.http.get<{
      total: number;
      pending: number;
      confirmed: number;
      completed: number;
      cancelled: number;
    }>(`${this.apiUrl}/stats`);
  }
}
