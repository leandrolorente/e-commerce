import { Injectable, signal } from '@angular/core';
import { Order, OrderStatus, PaymentMethod, PaymentStatus, UpdateOrderDto, OrderFilter } from '../../../models/interfaces/order.interface';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersService {
  private orders = signal<Order[]>([
    {
      id: 'ORD-001',
      userId: 'user1',
      customerName: 'João Silva',
      customerEmail: 'joao@email.com',
      customerPhone: '(18) 99999-1111',
      items: [
        {
          product: {
            id: '1',
            name: 'Pomada Cicatrizante Premium',
            description: 'Pomada especializada',
            price: 45.90,
            category: 'cuidados' as any,
            images: ['assets/products/pomada1.jpg'],
            stock: 50,
            rating: 4.8,
            reviewCount: 124,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          quantity: 2
        }
      ],
      subtotal: 91.80,
      tax: 0,
      shipping: 15.00,
      discount: 0,
      total: 106.80,
      status: OrderStatus.PENDING,
      paymentMethod: PaymentMethod.PIX,
      paymentStatus: PaymentStatus.PENDING,
      shippingAddress: {
        street: 'Rua das Flores',
        number: '123',
        neighborhood: 'Centro',
        city: 'Presidente Prudente',
        state: 'SP',
        zipCode: '19010-000',
        country: 'Brasil'
      },
      billingAddress: {
        street: 'Rua das Flores',
        number: '123',
        neighborhood: 'Centro',
        city: 'Presidente Prudente',
        state: 'SP',
        zipCode: '19010-000',
        country: 'Brasil'
      },
      createdAt: new Date('2024-11-20'),
      updatedAt: new Date('2024-11-20')
    },
    {
      id: 'ORD-002',
      userId: 'user2',
      customerName: 'Maria Santos',
      customerEmail: 'maria@email.com',
      customerPhone: '(18) 99999-2222',
      items: [
        {
          product: {
            id: '2',
            name: 'Protetor Solar FPS 50',
            description: 'Proteção solar',
            price: 49.90,
            category: 'cuidados' as any,
            images: ['assets/products/protetor.jpg'],
            stock: 30,
            rating: 4.9,
            reviewCount: 89,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          quantity: 1
        },
        {
          product: {
            id: '3',
            name: 'Camiseta Guarana Tatto',
            description: 'Camiseta 100% algodão',
            price: 79.90,
            category: 'vestuario' as any,
            images: ['assets/products/camiseta.jpg'],
            stock: 25,
            rating: 4.7,
            reviewCount: 45,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          quantity: 1
        }
      ],
      subtotal: 129.80,
      tax: 0,
      shipping: 20.00,
      discount: 10.00,
      total: 139.80,
      status: OrderStatus.CONFIRMED,
      paymentMethod: PaymentMethod.CREDIT_CARD,
      paymentStatus: PaymentStatus.PAID,
      shippingAddress: {
        street: 'Av. Brasil',
        number: '456',
        neighborhood: 'Jardim América',
        city: 'Presidente Prudente',
        state: 'SP',
        zipCode: '19020-000',
        country: 'Brasil'
      },
      billingAddress: {
        street: 'Av. Brasil',
        number: '456',
        neighborhood: 'Jardim América',
        city: 'Presidente Prudente',
        state: 'SP',
        zipCode: '19020-000',
        country: 'Brasil'
      },
      notes: 'Entregar no período da manhã',
      createdAt: new Date('2024-11-19'),
      updatedAt: new Date('2024-11-20')
    }
  ]);

  getOrders(filter?: OrderFilter): Observable<Order[]> {
    let filtered = [...this.orders()];

    if (filter) {
      if (filter.status) {
        filtered = filtered.filter(o => o.status === filter.status);
      }
      if (filter.paymentStatus) {
        filtered = filtered.filter(o => o.paymentStatus === filter.paymentStatus);
      }
      if (filter.searchTerm) {
        const term = filter.searchTerm.toLowerCase();
        filtered = filtered.filter(o => 
          o.id.toLowerCase().includes(term) ||
          o.customerName.toLowerCase().includes(term) ||
          o.customerEmail.toLowerCase().includes(term)
        );
      }
    }

    return of(filtered).pipe(delay(300));
  }

  getOrderById(id: string): Observable<Order | undefined> {
    return of(this.orders().find(o => o.id === id)).pipe(delay(200));
  }

  updateOrder(id: string, updates: UpdateOrderDto): Observable<Order> {
    let updatedOrder: Order | undefined;
    
    this.orders.update(orders => 
      orders.map(o => {
        if (o.id === id) {
          updatedOrder = { ...o, ...updates, updatedAt: new Date() };
          return updatedOrder;
        }
        return o;
      })
    );
    
    return of(updatedOrder!).pipe(delay(500));
  }

  deleteOrder(id: string): Observable<boolean> {
    this.orders.update(orders => orders.filter(o => o.id !== id));
    return of(true).pipe(delay(300));
  }

  getOrderStats(): Observable<{
    total: number;
    pending: number;
    confirmed: number;
    delivered: number;
    totalRevenue: number;
  }> {
    const orders = this.orders();
    return of({
      total: orders.length,
      pending: orders.filter(o => o.status === OrderStatus.PENDING).length,
      confirmed: orders.filter(o => o.status === OrderStatus.CONFIRMED).length,
      delivered: orders.filter(o => o.status === OrderStatus.DELIVERED).length,
      totalRevenue: orders.reduce((sum, o) => sum + o.total, 0)
    }).pipe(delay(300));
  }
}
