import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Tattoo } from '@models';
import { TattooService } from '@core/services/tattoo.service';

@Component({
  selector: 'app-tattoo-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tattoo-detail.component.html',
  styleUrl: './tattoo-detail.component.scss'
})
export class TattooDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tattooService = inject(TattooService);

  tattoo = signal<Tattoo | null>(null);
  selectedImageIndex = signal(0);
  whatsappNumber = '5518996566692';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tattooService.getTattooById(id).subscribe({
        next: (tattoo) => {
          this.tattoo.set(tattoo);
        },
        error: (err) => {
          console.error('Erro ao carregar tatuagem:', err);
          this.router.navigate(['/tattoos']);
        }
      });
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
