import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Tattoo } from '@models';
import { MOCK_TATTOOS } from '@core/services/tattoo-mocks';

@Component({
  selector: 'app-tattoo-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tattoo-detail.component.html',
  styleUrl: './tattoo-detail.component.scss'
})
export class TattooDetailComponent implements OnInit {
  tattoo = signal<Tattoo | null>(null);
  selectedImageIndex = signal(0);
  whatsappNumber = '5518996566692'; // Formato internacional sem espaços

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const foundTattoo = MOCK_TATTOOS.find(t => t.id === id);
      if (foundTattoo) {
        this.tattoo.set(foundTattoo);
      } else {
        this.router.navigate(['/tattoos']);
      }
    }
  }

  selectImage(index: number) {
    this.selectedImageIndex.set(index);
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://via.placeholder.com/800x600/2d5f7a/ffffff?text=Imagem+Indisponível';
  }

  consultWhatsApp() {
    const tattoo = this.tattoo();
    if (!tattoo) return;

    const message = encodeURIComponent(
      `Olá! Tenho interesse na tatuagem:\n\n` +
      `📌 *${tattoo.name}*\n` +
      `🎨 Estilo: ${tattoo.style}\n` +
      `📍 Área: ${tattoo.bodyArea}\n` +
      `📏 Tamanho: ${tattoo.size}\n\n` +
      `Gostaria de agendar uma consulta!`
    );

    window.open(`https://wa.me/${this.whatsappNumber}?text=${message}`, '_blank');
  }

  goBack() {
    const tattoo = this.tattoo();
    if (tattoo) {
      this.router.navigate(['/tattoos'], { 
        queryParams: { area: tattoo.bodyArea } 
      });
    } else {
      this.router.navigate(['/tattoos']);
    }
  }
}
