import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

export interface Artist {
  id: string;
  name: string;
  specialty: string;
  photo: string;
  yearsExperience: number;
  rating: number;
}

export interface BookingTimeSlot {
  time: string;
  available: boolean;
}

export interface AvailableSlotsResponse {
  artistId: string;
  date: string;
  availableSlots: string[];
  bookedSlots: string[];
}

export interface BookingData {
  serviceType: string;
  artistId: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tattooDescription?: string;
  bodyArea?: string;
  referenceImages?: string[];
}

// DTO para criar booking (formato esperado pelo backend)
export interface CreateBookingDto {
  artistId: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}

export interface BookingResponse {
  id: string;
  status: string;
  confirmationCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly API_URL = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  // GET /api/bookings/artists
  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.API_URL}/artists`);
  }

  getAvailableSlots(artistId: string, date: string): Observable<BookingTimeSlot[]> {
    const params = new HttpParams()
      .set('artistId', artistId)
      .set('date', date);
    return this.http.get<AvailableSlotsResponse>(`${this.API_URL}/available-slots`, { params })
      .pipe(
        map(response => {
          // Transformar os arrays de strings em array de BookingTimeSlot
          return response.availableSlots.map(time => ({
            time,
            available: !response.bookedSlots.includes(time)
          }));
        })
      );
  }

  createBooking(bookingData: BookingData): Observable<BookingResponse> {
    // Transformar BookingData em CreateBookingDto
    const dto: CreateBookingDto = {
      artistId: bookingData.artistId,
      service: bookingData.serviceType,
      date: bookingData.date,
      time: bookingData.timeSlot,
      notes: [
        `Nome: ${bookingData.customerName}`,
        `Email: ${bookingData.customerEmail}`,
        `Telefone: ${bookingData.customerPhone}`,
        bookingData.tattooDescription ? `Descrição: ${bookingData.tattooDescription}` : '',
        bookingData.bodyArea ? `Área do corpo: ${bookingData.bodyArea}` : ''
      ].filter(Boolean).join('\n')
    };

    return this.http.post<BookingResponse>(this.API_URL, dto);
  }

  getMyBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/my-bookings`);
  }

  cancelBooking(bookingId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.API_URL}/${bookingId}`);
  }

  rescheduleBooking(bookingId: string, newDate: string, newTime: string): Observable<boolean> {
    return this.http.patch<boolean>(`${this.API_URL}/${bookingId}/reschedule`, {
      date: newDate,
      time: newTime
    });
  }
}
