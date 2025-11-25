import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrdersService, Order } from '../../services/orders.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="orders-container">
      <h1>Meus Pedidos</h1>

      @if (isLoading()) {
        <div class="loading">Carregando pedidos...</div>
      } @else if (orders().length === 0) {
        <div class="empty-state">
          <p>Você ainda não fez nenhum pedido</p>
          <a routerLink="/products" class="btn-shop">Começar a Comprar</a>
        </div>
      } @else {
        <div class="orders-list">
          @for (order of orders(); track order.id) {
            <div class="order-card">
              <div class="order-header">
                <div>
                  <strong>Pedido #{{ order.id }}</strong>
                  <span class="order-date">{{ order.createdAt | date: 'dd/MM/yyyy HH:mm' }}</span>
                </div>
                <span class="order-status" [class]="'status-' + order.status">
                  {{ getStatusLabel(order.status) }}
                </span>
              </div>

              <div class="order-items">
                @for (item of order.items; track $index) {
                  <div class="order-item">
                    <img [src]="item.product.images[0]" [alt]="item.product.name">
                    <div class="item-info">
                      <h4>{{ item.product.name }}</h4>
                      <p>Quantidade: {{ item.quantity }}</p>
                    </div>
                    <div class="item-price">
                      R$ {{ (item.product.price * item.quantity).toFixed(2) }}
                    </div>
                  </div>
                }
              </div>

              <div class="order-footer">
                <div class="order-total">
                  <strong>Total:</strong>
                  <span class="total-value">R$ {{ order.total.toFixed(2) }}</span>
                </div>
                <div class="order-actions">
                  <button class="btn-details" (click)="viewDetails(order)">Ver Detalhes</button>
                  @if (canCancel(order.status)) {
                    <button class="btn-cancel" (click)="cancelOrder(order.id)">Cancelar</button>
                  }
                  @if (canReorder(order.status)) {
                    <button class="btn-reorder" (click)="reorder(order)">Comprar Novamente</button>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>

    @if (selectedOrder()) {
      <div class="modal-overlay" (click)="closeDetails()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <h2>Detalhes do Pedido #{{ selectedOrder()!.id }}</h2>
          
          <div class="detail-section">
            <h3>Status</h3>
            <p class="status-badge" [class]="'status-' + selectedOrder()!.status">
              {{ getStatusLabel(selectedOrder()!.status) }}
            </p>
          </div>

          <div class="detail-section">
            <h3>Endereço de Entrega</h3>
            <p>{{ selectedOrder()!.shippingAddress.street }}, {{ selectedOrder()!.shippingAddress.number }}</p>
            <p>{{ selectedOrder()!.shippingAddress.city }} - {{ selectedOrder()!.shippingAddress.state }}</p>
            <p>CEP: {{ selectedOrder()!.shippingAddress.zipCode }}</p>
          </div>

          <div class="detail-section">
            <h3>Itens</h3>
            @for (item of selectedOrder()!.items; track $index) {
              <div class="detail-item">
                <span>{{ item.product.name }} x{{ item.quantity }}</span>
                <span>R$ {{ (item.product.price * item.quantity).toFixed(2) }}</span>
              </div>
            }
          </div>

          <div class="detail-section">
            <h3>Resumo</h3>
            <div class="detail-item">
              <span>Subtotal</span>
              <span>R$ {{ selectedOrder()!.total.toFixed(2) }}</span>
            </div>
            <div class="detail-item total">
              <strong>Total</strong>
              <strong>R$ {{ selectedOrder()!.total.toFixed(2) }}</strong>
            </div>
          </div>

          <button class="btn-close" (click)="closeDetails()">Fechar</button>
        </div>
      </div>
    }
  `,
  styles: [`
    .orders-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    h1 {
      color: var(--primary-color);
      margin-bottom: 2rem;
    }

    .orders-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .order-card {
      background: #fff;
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eee;

      strong {
        color: var(--text-dark);
      }
    }

    .order-date {
      color: #666;
      font-size: 0.9rem;
      margin-left: 1rem;
    }

    .order-status {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 700;

      &.status-PENDING {
        background: #FFA500;
        color: #fff;
      }

      &.status-CONFIRMED {
        background: #4CAF50;
        color: #fff;
      }

      &.status-PROCESSING {
        background: #2196F3;
        color: #fff;
      }

      &.status-SHIPPED {
        background: var(--bronze-color);
        color: #fff;
      }

      &.status-DELIVERED {
        background: var(--primary-color);
        color: #fff;
      }

      &.status-CANCELLED {
        background: #666;
        color: #fff;
      }
    }

    .order-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .order-item {
      display: flex;
      gap: 1rem;
      align-items: center;

      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 8px;
      }

      .item-info {
        flex: 1;

        h4 {
          margin: 0 0 0.5rem;
          font-size: 1rem;
        }

        p {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
        }
      }

      .item-price {
        font-weight: 700;
        color: var(--primary-color);
      }
    }

    .order-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }

    .order-total {
      .total-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--accent-color);
        margin-left: 1rem;
      }
    }

    .order-actions {
      display: flex;
      gap: 0.5rem;

      button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s;

        &.btn-details {
          background: var(--primary-color);
          color: #fff;
        }

        &.btn-cancel {
          background: #ff4444;
          color: #fff;
        }

        &.btn-reorder {
          background: var(--bronze-color);
          color: #fff;
        }

        &:hover {
          opacity: 0.9;
        }
      }
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;

      p {
        font-size: 1.2rem;
        color: #666;
        margin-bottom: 2rem;
      }

      .btn-shop {
        display: inline-block;
        padding: 1rem 2rem;
        background: var(--primary-color);
        color: #fff;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
      }
    }

    .loading {
      text-align: center;
      padding: 3rem;
      color: #666;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
    }

    .modal-content {
      background: #fff;
      border-radius: 16px;
      padding: 2rem;
      max-width: 600px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;

      h2,
      h3 {
        color: var(--primary-color);
      }

      .detail-section {
        margin: 1.5rem 0;
        padding: 1rem 0;
        border-bottom: 1px solid #eee;
      }

      .detail-item {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;

        &.total {
          font-size: 1.2rem;
          padding-top: 1rem;
          border-top: 2px solid #eee;
        }
      }

      .btn-close {
        width: 100%;
        padding: 1rem;
        margin-top: 1.5rem;
        background: var(--primary-color);
        color: #fff;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
      }
    }
  `]
})
export class MyOrdersComponent implements OnInit {
  orders = signal<Order[]>([]);
  selectedOrder = signal<Order | null>(null);
  isLoading = signal(false);

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading.set(true);
    this.ordersService.getMyOrders().subscribe({
      next: (orders: Order[]) => {
        this.orders.set(orders);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      PENDING: 'Pendente',
      CONFIRMED: 'Confirmado',
      PROCESSING: 'Processando',
      SHIPPED: 'Enviado',
      DELIVERED: 'Entregue',
      CANCELLED: 'Cancelado'
    };
    return labels[status] || status;
  }

  canCancel(status: string): boolean {
    return ['PENDING', 'CONFIRMED'].includes(status);
  }

  canReorder(status: string): boolean {
    return ['DELIVERED', 'CANCELLED'].includes(status);
  }

  viewDetails(order: Order) {
    this.selectedOrder.set(order);
  }

  closeDetails() {
    this.selectedOrder.set(null);
  }

  cancelOrder(orderId: string) {
    if (!confirm('Deseja realmente cancelar este pedido?')) return;

    this.ordersService.cancelOrder(orderId).subscribe({
      next: () => {
        alert('Pedido cancelado com sucesso!');
        this.loadOrders();
      },
      error: () => alert('Erro ao cancelar pedido')
    });
  }

  reorder(order: Order) {
    // Implementar lógica de recompra
    alert('Funcionalidade em desenvolvimento');
  }
}
