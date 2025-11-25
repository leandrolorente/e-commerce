import { OrderStatus } from '../enums';
import { CartItem } from './cart.interface';

export { OrderStatus };

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderRequest {
  items: CartItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
}

export enum PaymentMethod {
  PIX = 'PIX',
  CREDIT_CARD = 'Cartão de Crédito',
  DEBIT_CARD = 'Cartão de Débito',
  CASH = 'Dinheiro',
  BANK_TRANSFER = 'Transferência Bancária'
}

export enum PaymentStatus {
  PENDING = 'Pendente',
  PAID = 'Pago',
  FAILED = 'Falhou',
  REFUNDED = 'Reembolsado'
}

export interface OrderFilter {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  searchTerm?: string;
  startDate?: Date;
  endDate?: Date;
  sortBy?: 'date' | 'total' | 'customer';
  sortOrder?: 'asc' | 'desc';
}

export interface UpdateOrderDto {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  notes?: string;
}
