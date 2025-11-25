import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from '@shared/components/layout/header/header.component';
import { FooterComponent } from '@shared/components/layout/footer/footer.component';
import { Tattoo } from '@models';
import { MOCK_TATTOOS } from '@core/services/tattoo-mocks';

@Component({
  selector: 'app-tattoo-list',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './tattoo-list.component.html',
  styleUrl: './tattoo-list.component.scss'
})
export class TattooListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  
  tattoos = signal<Tattoo[]>([]);
  selectedArea = signal<string>('');
  loading = signal(false);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedArea.set(params['area'] || '');
      this.filterTattoos();
    });
  }

  filterTattoos(): void {
    this.loading.set(true);
    setTimeout(() => {
      if (this.selectedArea()) {
        this.tattoos.set(
          MOCK_TATTOOS.filter(t => t.bodyArea === this.selectedArea())
        );
      } else {
        this.tattoos.set(MOCK_TATTOOS);
      }
      this.loading.set(false);
    }, 300);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://placehold.co/600x400/2d5f7a/ffffff?text=Tatuagem';
  }
}
