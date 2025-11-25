import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService, BookingData } from '../../../booking/services/booking.service';
import { NotificationService } from '../../../../core/services/notification.service';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  bookings: BookingData[];
}

@Component({
  selector: 'app-admin-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-schedule.component.html',
  styleUrls: ['./admin-schedule.component.scss']
})
export class AdminScheduleComponent implements OnInit {
  private bookingService = inject(BookingService);
  private notificationService = inject(NotificationService);

  currentMonth = signal(new Date());
  calendarDays = signal<CalendarDay[]>([]);
  selectedDate = signal<Date | null>(null);
  selectedDayBookings = signal<BookingData[]>([]);
  allBookings = signal<BookingData[]>([]);
  isLoading = signal(false);

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.isLoading.set(true);
    // Simulando dados - substituir por chamada real à API
    setTimeout(() => {
      const mockBookings: BookingData[] = [
        {
          serviceType: 'new-tattoo',
          artistId: '1',
          date: new Date(2025, 10, 26).toISOString().split('T')[0],
          timeSlot: '10:00',
          customerName: 'João Silva',
          customerEmail: 'joao@email.com',
          customerPhone: '(18) 99999-9999',
          tattooDescription: 'Dragão oriental',
          bodyArea: 'Braço',
          referenceImages: []
        },
        {
          serviceType: 'consultation',
          artistId: '2',
          date: new Date(2025, 10, 26).toISOString().split('T')[0],
          timeSlot: '14:00',
          customerName: 'Maria Santos',
          customerEmail: 'maria@email.com',
          customerPhone: '(18) 98888-8888',
          tattooDescription: '',
          bodyArea: '',
          referenceImages: []
        },
        {
          serviceType: 'touch-up',
          artistId: '1',
          date: new Date(2025, 10, 28).toISOString().split('T')[0],
          timeSlot: '15:00',
          customerName: 'Pedro Costa',
          customerEmail: 'pedro@email.com',
          customerPhone: '(18) 97777-7777',
          tattooDescription: 'Retoque de tatuagem antiga',
          bodyArea: 'Costas',
          referenceImages: []
        },
        {
          serviceType: 'new-tattoo',
          artistId: '3',
          date: new Date(2025, 10, 29).toISOString().split('T')[0],
          timeSlot: '11:00',
          customerName: 'Ana Paula',
          customerEmail: 'ana@email.com',
          customerPhone: '(18) 96666-6666',
          tattooDescription: 'Flor de lótus',
          bodyArea: 'Ombro',
          referenceImages: []
        }
      ];

      this.allBookings.set(mockBookings);
      this.generateCalendarDays();
      this.isLoading.set(false);
    }, 500);
  }

  generateCalendarDays() {
    const year = this.currentMonth().getFullYear();
    const month = this.currentMonth().getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);

    const days: CalendarDay[] = [];
    const firstDayOfWeek = firstDay.getDay();

    // Previous month days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevLastDay.getDate() - i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: this.isToday(date),
        bookings: this.getBookingsForDate(date)
      });
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: this.isToday(date),
        bookings: this.getBookingsForDate(date)
      });
    }

    // Next month days to complete the grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: this.isToday(date),
        bookings: this.getBookingsForDate(date)
      });
    }

    this.calendarDays.set(days);
  }

  getBookingsForDate(date: Date): BookingData[] {
    const dateStr = date.toISOString().split('T')[0];
    return this.allBookings().filter(booking => booking.date === dateStr);
  }

  isToday(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const check = new Date(date);
    check.setHours(0, 0, 0, 0);
    return today.getTime() === check.getTime();
  }

  previousMonth() {
    const newDate = new Date(this.currentMonth());
    newDate.setMonth(newDate.getMonth() - 1);
    this.currentMonth.set(newDate);
    this.generateCalendarDays();
  }

  nextMonth() {
    const newDate = new Date(this.currentMonth());
    newDate.setMonth(newDate.getMonth() + 1);
    this.currentMonth.set(newDate);
    this.generateCalendarDays();
  }

  selectDay(day: CalendarDay) {
    this.selectedDate.set(day.date);
    this.selectedDayBookings.set(day.bookings);
  }

  isDateSelected(date: Date): boolean {
    if (!this.selectedDate()) return false;
    const selected = new Date(this.selectedDate()!);
    selected.setHours(0, 0, 0, 0);
    const check = new Date(date);
    check.setHours(0, 0, 0, 0);
    return selected.getTime() === check.getTime();
  }

  getMonthYearLabel(): string {
    return this.currentMonth().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }

  getServiceLabel(type: string): string {
    const types: { [key: string]: string } = {
      'new-tattoo': 'Nova Tatuagem',
      'touch-up': 'Retoque',
      'consultation': 'Consulta',
      'cover-up': 'Cover Up'
    };
    return types[type] || type;
  }

  closeDetails() {
    this.selectedDate.set(null);
    this.selectedDayBookings.set([]);
  }
}
