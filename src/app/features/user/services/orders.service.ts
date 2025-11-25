import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Order } from '../../../models/interfaces/order.interface';
import { Product } from '@models';

export { Order } from '../../../models/interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private mockOrders: Order[] = [];

  constructor() {}

  // GET /api/orders/my-orders
  getMyOrders(): Observable<Order[]> {
    return of(this.mockOrders).pipe(delay(500));
  }

  // GET /api/orders/:id
  getOrderById(orderId: string): Observable<Order | undefined> {
    return of(this.mockOrders.find(o => o.id === orderId)).pipe(delay(300));
  }

  // PUT /api/orders/:id/cancel
  cancelOrder(orderId: string): Observable<boolean> {
    return of(true).pipe(delay(500));
  }

  // POST /api/orders/:id/track
  trackOrder(orderId: string): Observable<any> {
    return of({
      status: 'SHIPPED',
      trackingCode: 'BR123456789BR',
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }).pipe(delay(300));
  }
}
