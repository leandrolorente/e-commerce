import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Product, Testimonial } from '@models';
import { Tattoo } from '../../../../models/interfaces/tattoo.interface';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredTattoos = signal<Tattoo[]>([]);
  featuredProducts = signal<Product[]>([]);
  testimonials = signal<Testimonial[]>([]);
  isLoading = signal(true);

  studioStats = signal({
    yearsExperience: 0,
    satisfiedClients: 0,
    artistsCount: 0,
    awardsCount: 0
  });

  constructor(
    private homeService: HomeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadHomeData();
  }

  loadHomeData() {
    this.isLoading.set(true);

    this.homeService.getFeaturedTattoos().subscribe({
      next: (tattoos) => this.featuredTattoos.set(tattoos)
    });

    this.homeService.getFeaturedProducts().subscribe({
      next: (products) => this.featuredProducts.set(products)
    });

    this.homeService.getTestimonials().subscribe({
      next: (testimonials) => {
        this.testimonials.set(testimonials);
        this.isLoading.set(false);
      }
    });

    this.homeService.getStudioStats().subscribe({
      next: (stats) => this.studioStats.set(stats)
    });
  }

  navigateToBooking() {
    this.router.navigate(['/booking']);
  }

  navigateToGallery() {
    this.router.navigate(['/gallery']);
  }

  openWhatsApp() {
    const phone = '5518996566692';
    const message = encodeURIComponent('Olá! Gostaria de agendar uma sessão no Guarana Tatto.');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }

  getStars(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }
}
