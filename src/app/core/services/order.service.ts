import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderRequest } from '@models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly API_URL = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  createOrder(orderRequest: OrderRequest): Observable<Order> {
    return this.http.post<Order>(this.API_URL, orderRequest);
  }

  // GET /api/orders (admin ou user)
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.API_URL);
  }

  // GET /api/orders/my-orders (usuário logado)
  getMyOrders(status?: string): Observable<Order[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<Order[]>(`${this.API_URL}/my-orders`, { params });
  }

  // GET /api/orders/stats (admin)
  getOrderStats(): Observable<{
    totalOrders: number;
    totalRevenue: number;
    ordersByStatus: Record<string, number>;
  }> {
    return this.http.get<{
      totalOrders: number;
      totalRevenue: number;
      ordersByStatus: Record<string, number>;
    }>(`${this.API_URL}/stats`);
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.API_URL}/${id}`);
  }

  // GET /api/orders/:id/track
  trackOrder(id: string): Observable<{
    order: Order;
    timeline: Array<{
      status: string;
      date?: string;
      description: string;
      completed: boolean;
    }>;
  }> {
    return this.http.get<{
      order: Order;
      timeline: Array<{
        status: string;
        date?: string;
        description: string;
        completed: boolean;
      }>;
    }>(`${this.API_URL}/${id}/track`);
  }

  // PUT /api/orders/:id (admin)
  updateOrder(id: string, updates: Partial<Order>): Observable<Order> {
    return this.http.put<Order>(`${this.API_URL}/${id}`, updates);
  }

  // PUT /api/orders/:id/cancel
  cancelOrder(orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.API_URL}/${orderId}/cancel`, {});
  }

  // DELETE /api/orders/:id (admin)
  deleteOrder(orderId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/${orderId}`);
  }
}
