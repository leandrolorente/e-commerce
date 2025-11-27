import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export interface PaymentRequest {
  orderId: string;
  paymentMethod: 'credit_card' | 'pix' | 'boleto';
}

export interface PaymentResponse {
  id: string;
  orderId: string;
  mercadoPagoId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  amount: number;
  paymentUrl: string;
  qrCode?: string; // Para PIX
  qrCodeBase64?: string; // Para PIX
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly API_URL = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  createPayment(paymentRequest: PaymentRequest): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(this.API_URL, paymentRequest);
  }

  getPaymentStatus(paymentId: string): Observable<PaymentResponse> {
    return this.http.get<PaymentResponse>(`${this.API_URL}/${paymentId}`);
  }

  getOrderPayment(orderId: string): Observable<PaymentResponse> {
    return this.http.get<PaymentResponse>(`${this.API_URL}/order/${orderId}`);
  }
}
