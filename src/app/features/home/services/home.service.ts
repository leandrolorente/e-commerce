import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '@models';
import { Tattoo } from '../../../models/interfaces/tattoo.interface';
import { MOCK_TATTOOS } from '../../../core/services/tattoo-mocks';
import { MOCK_FEATURED_PRODUCTS } from '../../../core/services/mock-data';

interface Testimonial {
  id: string;
  customerName: string;
  customerPhoto: string;
  rating: number;
  comment: string;
  date: Date;
  service: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private mockTestimonials: Testimonial[] = [
    {
      id: '1',
      customerName: 'Ana Carolina',
      customerPhoto: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      comment: 'Experiência incrível! O Gabriel fez uma tatuagem realista no meu braço que superou todas as minhas expectativas. Atendimento impecável e ambiente muito profissional.',
      date: new Date('2024-11-15'),
      service: 'Tatuagem Realista'
    },
    {
      id: '2',
      customerName: 'Ricardo Santos',
      customerPhoto: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      comment: 'Fiz minha primeira tatuagem com a Amanda e foi perfeito! Ela me deixou super tranquilo e o resultado ficou lindo. Já quero fazer a próxima!',
      date: new Date('2024-11-10'),
      service: 'Tatuagem Fine Line'
    },
    {
      id: '3',
      customerName: 'Juliana Ferreira',
      customerPhoto: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      comment: 'Ambiente super limpo e organizado. Os produtos de cuidados que comprei são excelentes! A pomada cicatrizante ajudou muito na recuperação.',
      date: new Date('2024-11-05'),
      service: 'Produtos de Cuidados'
    },
    {
      id: '4',
      customerName: 'Lucas Oliveira',
      customerPhoto: 'https://i.pravatar.cc/150?img=8',
      rating: 5,
      comment: 'Yuki é um artista incrível! A tatuagem japonesa que ele fez nas minhas costas é uma obra de arte. Valeu cada segundo!',
      date: new Date('2024-10-28'),
      service: 'Tatuagem Japonesa'
    },
    {
      id: '5',
      customerName: 'Mariana Costa',
      customerPhoto: 'https://i.pravatar.cc/150?img=9',
      rating: 5,
      comment: 'Adorei! Fiz uma tatuagem aquarela linda com a Isabella. Ela entendeu exatamente o que eu queria e o resultado foi além!',
      date: new Date('2024-10-20'),
      service: 'Tatuagem Aquarela'
    },
    {
      id: '6',
      customerName: 'Pedro Henrique',
      customerPhoto: 'https://i.pravatar.cc/150?img=13',
      rating: 5,
      comment: 'Profissionalismo do início ao fim. Fiz uma manga completa e cada sessão foi impecável. Recomendo demais!',
      date: new Date('2024-10-15'),
      service: 'Manga Completa'
    }
  ];

  constructor() {}

  // Em produção, estas chamadas irão para o backend
  // GET /api/home/featured-tattoos
  getFeaturedTattoos(): Observable<Tattoo[]> {
    const featured = MOCK_TATTOOS.slice(0, 6);
    return of(featured).pipe(delay(500));
  }

  // GET /api/home/featured-products
  getFeaturedProducts(): Observable<Product[]> {
    return of(MOCK_FEATURED_PRODUCTS).pipe(delay(500));
  }

  // GET /api/home/testimonials
  getTestimonials(): Observable<Testimonial[]> {
    return of(this.mockTestimonials).pipe(delay(500));
  }

  // GET /api/home/stats
  getStudioStats(): Observable<any> {
    return of({
      yearsExperience: 10,
      satisfiedClients: 5000,
      artistsCount: 8,
      awardsCount: 15
    }).pipe(delay(300));
  }
}
