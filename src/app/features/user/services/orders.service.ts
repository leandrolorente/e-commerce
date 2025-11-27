import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../../models/interfaces/order.interface';
import { environment } from '../../../../environments/environment';

export { Order } from '../../../models/interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/orders`;

  // GET /api/orders/my-orders (or GET /api/orders with JWT filtering on backend)
  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/my-orders`);
  }

  // GET /api/orders/:id
  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

  // PUT /api/orders/:id/cancel
  cancelOrder(orderId: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/${orderId}/cancel`, {});
  }

  // POST /api/orders/:id/track
  trackOrder(orderId: string): Observable<{
    status: string;
    trackingCode: string;
    estimatedDelivery: Date;
  }> {
    return this.http.get<{
      status: string;
      trackingCode: string;
      estimatedDelivery: Date;
    }>(`${this.apiUrl}/${orderId}/track`);
  }
}
