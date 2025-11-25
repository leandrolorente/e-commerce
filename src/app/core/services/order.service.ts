import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderRequest } from '@models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly API_URL = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {}

  createOrder(orderRequest: OrderRequest): Observable<Order> {
    return this.http.post<Order>(this.API_URL, orderRequest);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.API_URL);
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.API_URL}/${id}`);
  }

  getUserOrders(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.API_URL}/user/${userId}`);
  }

  updateOrderStatus(orderId: string, status: string): Observable<Order> {
    return this.http.patch<Order>(`${this.API_URL}/${orderId}/status`, { status });
  }

  cancelOrder(orderId: string): Observable<Order> {
    return this.http.delete<Order>(`${this.API_URL}/${orderId}`);
  }
}
