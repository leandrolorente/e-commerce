import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBookingService, BookingAdmin } from '../../services/admin-booking.service';
import { NotificationService } from '../../../../core/services/notification.service';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  bookings: BookingAdmin[];
}

@Component({
  selector: 'app-admin-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-schedule.component.html',
  styleUrls: ['./admin-schedule.component.scss']
})
export class AdminScheduleComponent implements OnInit {
  private adminBookingService = inject(AdminBookingService);
  private notificationService = inject(NotificationService);

  currentMonth = signal(new Date());
  calendarDays = signal<CalendarDay[]>([]);
  selectedDate = signal<Date | null>(null);
  selectedDayBookings = signal<BookingAdmin[]>([]);
  allBookings = signal<BookingAdmin[]>([]);
  isLoading = signal(false);

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.isLoading.set(true);
    this.adminBookingService.getAllBookings().subscribe({
      next: (bookings) => {
        console.log('📅 Bookings recebidos:', bookings);
        this.allBookings.set(bookings);
        this.generateCalendarDays();
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar agendamentos:', err);
        this.notificationService.error('Erro ao carregar agendamentos');
        this.isLoading.set(false);
      }
    });
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

  getBookingsForDate(date: Date): BookingAdmin[] {
    const dateStr = date.toISOString().split('T')[0];
    const filtered = this.allBookings().filter(booking => {
      // A API retorna date como "2025-11-30T00:00:00.000Z", então precisa extrair só a data
      const bookingDate = booking.date.split('T')[0];
      return bookingDate === dateStr;
    });

    if (filtered.length > 0) {
      console.log(`📌 Data ${dateStr}: ${filtered.length} agendamento(s)`);
    }

    return filtered;
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

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'PENDING': 'Pendente',
      'CONFIRMED': 'Confirmado',
      'COMPLETED': 'Concluído',
      'CANCELLED': 'Cancelado'
    };
    return labels[status] || status;
  }

  closeDetails() {
    this.selectedDate.set(null);
    this.selectedDayBookings.set([]);
  }
}
