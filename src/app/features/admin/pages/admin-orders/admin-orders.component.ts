import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order, OrderStatus, PaymentStatus, UpdateOrderDto } from '../../../../models/interfaces/order.interface';
import { AdminOrdersService } from '../../services/admin-orders.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders = signal<Order[]>([]);
  stats = signal<any>(null);
  isLoading = signal(false);
  showDetailsModal = signal(false);
  showEditModal = signal(false);
  showDeleteConfirm = signal(false);
  isSaving = signal(false);
  selectedOrder = signal<Order | null>(null);
  orderToDelete = signal<Order | null>(null);

  searchTerm = '';
  selectedStatus: OrderStatus | '' = '';
  selectedPaymentStatus: PaymentStatus | '' = '';

  statusOptions = [
    { value: OrderStatus.PENDING, label: 'Pendente' },
    { value: OrderStatus.PROCESSING, label: 'Em Processamento' },
    { value: OrderStatus.SHIPPED, label: 'Enviado' },
    { value: OrderStatus.DELIVERED, label: 'Entregue' },
    { value: OrderStatus.CANCELLED, label: 'Cancelado' }
  ];

  paymentStatusOptions = [
    { value: PaymentStatus.PENDING, label: 'Pendente' },
    { value: PaymentStatus.APPROVED, label: 'Aprovado' },
    { value: PaymentStatus.REJECTED, label: 'Rejeitado' },
    { value: PaymentStatus.CANCELLED, label: 'Cancelado' },
    { value: PaymentStatus.REFUNDED, label: 'Reembolsado' }
  ];

  editFormData: UpdateOrderDto = {};

  constructor(private adminOrdersService: AdminOrdersService) {}

  ngOnInit() {
    this.loadOrders();
    this.loadStats();
  }

  loadOrders() {
    this.isLoading.set(true);
    this.adminOrdersService.getOrders().subscribe({
      next: (orders) => {
        this.orders.set(orders);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  loadStats() {
    this.adminOrdersService.getOrderStats().subscribe({
      next: (stats) => this.stats.set(stats)
    });
  }

  applyFilters() {
    const filter = {
      status: this.selectedStatus || undefined,
      paymentStatus: this.selectedPaymentStatus || undefined,
      searchTerm: this.searchTerm || undefined
    };

    this.isLoading.set(true);
    this.adminOrdersService.getOrders(filter).subscribe({
      next: (orders) => {
        this.orders.set(orders);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  viewOrderDetails(order: Order) {
    this.selectedOrder.set(order);
    this.showDetailsModal.set(true);
  }

  closeDetailsModal() {
    this.showDetailsModal.set(false);
    this.selectedOrder.set(null);
  }

  openEditStatusModal(order: Order) {
    this.selectedOrder.set(order);
    this.editFormData = {
      status: order.status,
      paymentStatus: order.paymentStatus,
      notes: order.notes
    };
    this.showEditModal.set(true);
  }

  closeEditModal() {
    this.showEditModal.set(false);
    this.selectedOrder.set(null);
    this.editFormData = {};
  }

  updateOrderStatus() {
    const order = this.selectedOrder();
    if (!order) return;

    this.isSaving.set(true);
    this.adminOrdersService.updateOrder(order.id, this.editFormData).subscribe({
      next: () => {
        this.loadOrders();
        this.loadStats();
        this.closeEditModal();
        this.isSaving.set(false);
        alert('Status atualizado com sucesso!');
      },
      error: () => {
        this.isSaving.set(false);
        alert('Erro ao atualizar status');
      }
    });
  }

  confirmDelete(order: Order) {
    this.orderToDelete.set(order);
    this.showDeleteConfirm.set(true);
  }

  closeDeleteConfirm() {
    this.showDeleteConfirm.set(false);
    this.orderToDelete.set(null);
  }

  deleteOrder() {
    const order = this.orderToDelete();
    if (!order) return;

    this.isSaving.set(true);
    this.adminOrdersService.deleteOrder(order.id).subscribe({
      next: () => {
        this.loadOrders();
        this.loadStats();
        this.closeDeleteConfirm();
        this.isSaving.set(false);
        alert('Pedido excluído com sucesso!');
      },
      error: () => {
        this.isSaving.set(false);
        alert('Erro ao excluir pedido');
      }
    });
  }

  getStatusClass(status: OrderStatus): string {
    const statusMap: Record<OrderStatus, string> = {
      [OrderStatus.PENDING]: 'pending',
      [OrderStatus.PROCESSING]: 'processing',
      [OrderStatus.SHIPPED]: 'shipped',
      [OrderStatus.DELIVERED]: 'delivered',
      [OrderStatus.CANCELLED]: 'cancelled'
    };
    return statusMap[status] || 'default';
  }

  getPaymentClass(status: PaymentStatus): string {
    const paymentMap: Record<PaymentStatus, string> = {
      [PaymentStatus.PENDING]: 'pending',
      [PaymentStatus.APPROVED]: 'approved',
      [PaymentStatus.REJECTED]: 'rejected',
      [PaymentStatus.CANCELLED]: 'cancelled',
      [PaymentStatus.REFUNDED]: 'refunded'
    };
    return paymentMap[status] || 'default';
  }
}
