import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService, BookingData, Artist, BookingTimeSlot } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
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
          alert('Por favor, selecione o tipo de serviço');
          return false;
        }
        return true;
      case 2:
        if (!this.formData.artistId) {
          alert('Por favor, selecione um artista');
          return false;
        }
        if (!this.formData.date) {
          alert('Por favor, selecione uma data');
          return false;
        }
        if (!this.formData.timeSlot) {
          alert('Por favor, selecione um horário');
          return false;
        }
        return true;
      case 3:
        if (!this.formData.customerName || !this.formData.customerEmail || !this.formData.customerPhone) {
          alert('Por favor, preencha todos os campos obrigatórios');
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.formData.customerEmail)) {
          alert('Por favor, insira um email válido');
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
        alert('Agendamento realizado com sucesso! Em breve entraremos em contato para confirmar.');
        this.sendWhatsAppConfirmation();
        this.router.navigate(['/']);
      },
      error: () => {
        this.isSaving.set(false);
        alert('Erro ao realizar agendamento. Tente novamente.');
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
}
