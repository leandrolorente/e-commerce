import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

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

export interface BookingResponse {
  id: string;
  status: string;
  confirmationCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private mockArtists: Artist[] = [
    {
      id: '1',
      name: 'Gabriel Santos',
      specialty: 'Realismo',
      photo: 'https://i.pravatar.cc/150?img=12',
      yearsExperience: 12,
      rating: 4.9
    },
    {
      id: '2',
      name: 'Amanda Silva',
      specialty: 'Fine Line',
      photo: 'https://i.pravatar.cc/150?img=5',
      yearsExperience: 8,
      rating: 4.8
    },
    {
      id: '3',
      name: 'Yuki Tanaka',
      specialty: 'Japonês',
      photo: 'https://i.pravatar.cc/150?img=8',
      yearsExperience: 15,
      rating: 5.0
    },
    {
      id: '4',
      name: 'Isabella Rocha',
      specialty: 'Aquarela',
      photo: 'https://i.pravatar.cc/150?img=9',
      yearsExperience: 10,
      rating: 4.9
    },
    {
      id: '5',
      name: 'Rafael Almeida',
      specialty: 'Blackwork',
      photo: 'https://i.pravatar.cc/150?img=13',
      yearsExperience: 11,
      rating: 4.8
    },
    {
      id: '6',
      name: 'Camila Ferreira',
      specialty: 'Ornamental',
      photo: 'https://i.pravatar.cc/150?img=1',
      yearsExperience: 7,
      rating: 4.7
    }
  ];

  constructor() {}

  // Em produção: GET /api/booking/artists
  getArtists(): Observable<Artist[]> {
    return of(this.mockArtists).pipe(delay(300));
  }

  // Em produção: GET /api/booking/available-slots?artistId=X&date=Y
  getAvailableSlots(artistId: string, date: string): Observable<BookingTimeSlot[]> {
    const slots: BookingTimeSlot[] = [
      { time: '09:00', available: true },
      { time: '10:00', available: true },
      { time: '11:00', available: false },
      { time: '13:00', available: true },
      { time: '14:00', available: true },
      { time: '15:00', available: false },
      { time: '16:00', available: true },
      { time: '17:00', available: true }
    ];
    
    return of(slots).pipe(delay(500));
  }

  // Em produção: POST /api/booking
  createBooking(bookingData: BookingData): Observable<BookingResponse> {
    const response: BookingResponse = {
      id: `BK${Date.now()}`,
      status: 'pending_confirmation',
      confirmationCode: `GT${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };
    
    return of(response).pipe(delay(1000));
  }

  // Em produção: GET /api/booking/my-bookings
  getMyBookings(userId: string): Observable<any[]> {
    return of([]).pipe(delay(300));
  }

  // Em produção: PUT /api/booking/:id/cancel
  cancelBooking(bookingId: string): Observable<boolean> {
    return of(true).pipe(delay(500));
  }

  // Em produção: PUT /api/booking/:id/reschedule
  rescheduleBooking(bookingId: string, newDate: string, newTime: string): Observable<boolean> {
    return of(true).pipe(delay(500));
  }
}
