import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Order, OrderStatus, UpdateOrderDto, OrderFilter } from '../../../models/interfaces/order.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/orders`;

  // GET /api/orders (with filters)
  getOrders(filter?: OrderFilter): Observable<Order[]> {
    let params = new HttpParams();

    if (filter) {
      if (filter.status) {
        params = params.set('status', filter.status);
      }
      if (filter.paymentStatus) {
        params = params.set('paymentStatus', filter.paymentStatus);
      }
      if (filter.searchTerm) {
        params = params.set('search', filter.searchTerm);
      }
    }

    return this.http.get<Order[]>(this.apiUrl, { params });
  }

  // GET /api/orders/:id
  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  // PUT /api/orders/:id
  updateOrder(id: string, updates: UpdateOrderDto): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}`, updates);
  }

  // DELETE /api/orders/:id
  deleteOrder(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  // GET /api/orders/stats
  getOrderStats(): Observable<{
    total: number;
    pending: number;
    confirmed: number;
    delivered: number;
    totalRevenue: number;
  }> {
    return this.http.get<{
      total: number;
      pending: number;
      confirmed: number;
      delivered: number;
      totalRevenue: number;
    }>(`${this.apiUrl}/stats`);
  }
}
