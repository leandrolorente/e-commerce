import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService, BookingData, Artist, BookingTimeSlot } from '../../services/booking.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  private notificationService = inject(NotificationService);
  
  currentStep = signal(1);
  artists = signal<Artist[]>([]);
  availableSlots = signal<BookingTimeSlot[]>([]);
  isLoading = signal(false);
  isSaving = signal(false);

  formData: BookingData = {
    serviceType: '',
    artistId: '',
    date: '',
    timeSlot: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    tattooDescription: '',
    bodyArea: '',
    referenceImages: []
  };

  serviceTypes = [
    { value: 'new-tattoo', label: 'Nova Tatuagem', icon: '🎨' },
    { value: 'touch-up', label: 'Retoque', icon: '✨' },
    { value: 'consultation', label: 'Consulta/Orçamento', icon: '💬' },
    { value: 'cover-up', label: 'Cover Up', icon: '🔄' }
  ];

  bodyAreas = [
    'Braço', 'Antebraço', 'Costas', 'Peito', 'Perna', 'Coxa', 
    'Ombro', 'Nuca', 'Mão', 'Pé', 'Costelas', 'Outro'
  ];

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadArtists();
    this.generateCalendarDays();
  }

  loadArtists() {
    this.isLoading.set(true);
    this.bookingService.getArtists().subscribe({
      next: (artists) => {
        this.artists.set(artists);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  onArtistSelected() {
    if (this.formData.artistId && this.formData.date) {
      this.loadAvailableSlots();
    }
  }

  onDateSelected() {
    if (this.formData.artistId && this.formData.date) {
      this.loadAvailableSlots();
    }
  }

  loadAvailableSlots() {
    this.isLoading.set(true);
    this.bookingService.getAvailableSlots(this.formData.artistId, this.formData.date).subscribe({
      next: (slots) => {
        this.availableSlots.set(slots);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  nextStep() {
    if (this.validateStep(this.currentStep())) {
      this.currentStep.update(step => step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousStep() {
    this.currentStep.update(step => step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  validateStep(step: number): boolean {
    switch (step) {
      case 1:
        if (!this.formData.serviceType) {
          this.notificationService.warning('Por favor, selecione o tipo de serviço');
          return false;
        }
        return true;
      case 2:
        if (!this.formData.artistId) {
          this.notificationService.warning('Por favor, selecione um artista');
          return false;
        }
        if (!this.formData.date) {
          this.notificationService.warning('Por favor, selecione uma data');
          return false;
        }
        if (!this.formData.timeSlot) {
          this.notificationService.warning('Por favor, selecione um horário');
          return false;
        }
        return true;
      case 3:
        if (!this.formData.customerName || !this.formData.customerEmail || !this.formData.customerPhone) {
          this.notificationService.warning('Por favor, preencha todos os campos obrigatórios');
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.formData.customerEmail)) {
          this.notificationService.warning('Por favor, insira um email válido');
          return false;
        }
        return true;
      default:
        return true;
    }
  }

  submitBooking() {
    if (!this.validateStep(3)) return;

    this.isSaving.set(true);
    this.bookingService.createBooking(this.formData).subscribe({
      next: (response) => {
        this.isSaving.set(false);
        this.notificationService.success('Agendamento realizado com sucesso! Em breve entraremos em contato para confirmar.', 5000);
        this.sendWhatsAppConfirmation();
        this.router.navigate(['/']);
      },
      error: () => {
        this.isSaving.set(false);
        this.notificationService.error('Erro ao realizar agendamento. Tente novamente.');
      }
    });
  }

  sendWhatsAppConfirmation() {
    const phone = '5518996566692';
    const artist = this.artists().find(a => a.id === this.formData.artistId);
    const service = this.serviceTypes.find(s => s.value === this.formData.serviceType);
    
    const message = encodeURIComponent(
      `Olá! Acabei de fazer um agendamento:\n\n` +
      `Serviço: ${service?.label}\n` +
      `Artista: ${artist?.name}\n` +
      `Data: ${new Date(this.formData.date).toLocaleDateString('pt-BR')}\n` +
      `Horário: ${this.formData.timeSlot}\n` +
      `Nome: ${this.formData.customerName}\n` +
      `Telefone: ${this.formData.customerPhone}`
    );
    
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }

  getMinDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  getMaxDate(): string {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  }

  getSelectedArtist(): Artist | undefined {
    return this.artists().find(a => a.id === this.formData.artistId);
  }

  getSelectedService() {
    return this.serviceTypes.find(s => s.value === this.formData.serviceType);
  }

  formatPhoneNumber(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    
    if (value.length <= 10) {
      // (XX) XXXX-XXXX
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      // (XX) XXXXX-XXXX
      value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    
    this.formData.customerPhone = value;
  }

  // Calendar methods
  currentMonth = signal(new Date());
  selectedDate = signal<Date | null>(null);
  calendarDays = signal<Date[]>([]);

  generateCalendarDays() {
    const year = this.currentMonth().getFullYear();
    const month = this.currentMonth().getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    
    const days: Date[] = [];
    const firstDayOfWeek = firstDay.getDay();
    
    // Previous month days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month - 1, prevLastDay.getDate() - i);
      days.push(day);
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    // Next month days to complete the grid
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    this.calendarDays.set(days);
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

  selectDate(date: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    
    if (selectedDate > today) {
      this.selectedDate.set(date);
      this.formData.date = date.toISOString().split('T')[0];
      this.onDateSelected();
    }
  }

  isDateDisabled(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate <= today;
  }

  isDateSelected(date: Date): boolean {
    if (!this.selectedDate()) return false;
    const selected = new Date(this.selectedDate()!);
    selected.setHours(0, 0, 0, 0);
    const check = new Date(date);
    check.setHours(0, 0, 0, 0);
    return selected.getTime() === check.getTime();
  }

  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentMonth().getMonth();
  }

  isToday(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const check = new Date(date);
    check.setHours(0, 0, 0, 0);
    return today.getTime() === check.getTime();
  }

  getMonthYearLabel(): string {
    return this.currentMonth().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }
}
