import { ProductCategory } from '../enums/product-category.enum';
import { OrderStatus } from '../enums/order-status.enum';
import { BookingStatus } from '../enums/booking-status.enum';
import { BodyArea } from '../enums/body-area.enum';
import { PaymentStatus } from '../interfaces/order.interface';
import { TattooStyle, TattooSize } from '../interfaces/tattoo.interface';

/**
 * Helper functions para traduzir enums do backend (inglês uppercase)
 * para labels em português para exibição na UI
 */

export const ProductCategoryLabels: Record<ProductCategory, string> = {
  [ProductCategory.AFTERCARE]: 'Cuidados Pós-Tatuagem',
  [ProductCategory.CLOTHING]: 'Vestuário',
  [ProductCategory.ACCESSORIES]: 'Acessórios',
  [ProductCategory.EQUIPMENT]: 'Equipamentos',
  [ProductCategory.GIFT_CARD]: 'Vale-Presente',
  [ProductCategory.ART]: 'Arte & Prints'
};

export const OrderStatusLabels: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'Pendente',
  [OrderStatus.PROCESSING]: 'Em Processamento',
  [OrderStatus.SHIPPED]: 'Enviado',
  [OrderStatus.DELIVERED]: 'Entregue',
  [OrderStatus.CANCELLED]: 'Cancelado'
};

export const BookingStatusLabels: Record<BookingStatus, string> = {
  [BookingStatus.PENDING]: 'Pendente',
  [BookingStatus.CONFIRMED]: 'Confirmado',
  [BookingStatus.COMPLETED]: 'Concluído',
  [BookingStatus.CANCELLED]: 'Cancelado'
};

export const PaymentStatusLabels: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: 'Pendente',
  [PaymentStatus.APPROVED]: 'Aprovado',
  [PaymentStatus.REJECTED]: 'Rejeitado',
  [PaymentStatus.CANCELLED]: 'Cancelado',
  [PaymentStatus.REFUNDED]: 'Reembolsado'
};

export const BodyAreaLabels: Record<BodyArea, string> = {
  // Cabeça e Pescoço
  [BodyArea.ROSTO]: 'Rosto',
  [BodyArea.PESCOCO]: 'Pescoço',
  [BodyArea.NUCA]: 'Nuca',
  
  // Tronco - Frente
  [BodyArea.PEITO]: 'Peito',
  [BodyArea.PEITO_SUPERIOR]: 'Peito Superior',
  [BodyArea.PEITO_LATERAL]: 'Peito Lateral',
  [BodyArea.COSTELAS]: 'Costelas',
  [BodyArea.BARRIGA]: 'Barriga',
  [BodyArea.ABDOMEN]: 'Abdômen',
  
  // Tronco - Trás
  [BodyArea.COSTAS]: 'Costas',
  [BodyArea.COSTAS_SUPERIOR]: 'Costas Superior',
  [BodyArea.COSTAS_COMPLETAS]: 'Costas Completas',
  [BodyArea.LOMBAR]: 'Lombar',
  
  // Braços
  [BodyArea.BRACO]: 'Braço',
  [BodyArea.BRACO_COMPLETO]: 'Braço Completo',
  [BodyArea.BRACO_SUPERIOR]: 'Braço Superior',
  [BodyArea.BRACO_INTERNO]: 'Braço Interno',
  [BodyArea.BRACO_EXTERNO]: 'Braço Externo',
  [BodyArea.ANTEBRACO]: 'Antebraço',
  [BodyArea.ANTEBRACO_COMPLETO]: 'Antebraço Completo',
  [BodyArea.ANTEBRACO_INTERNO]: 'Antebraço Interno',
  [BodyArea.ANTEBRACO_EXTERNO]: 'Antebraço Externo',
  [BodyArea.COTOVELO]: 'Cotovelo',
  
  // Mãos
  [BodyArea.MAO]: 'Mão',
  [BodyArea.MAO_COMPLETA]: 'Mão Completa',
  [BodyArea.DEDOS]: 'Dedos',
  [BodyArea.PULSO]: 'Pulso',
  
  // Ombros
  [BodyArea.OMBRO]: 'Ombro',
  [BodyArea.OMBRO_COMPLETO]: 'Ombro Completo',
  
  // Pernas
  [BodyArea.PERNA_COMPLETA]: 'Perna Completa',
  [BodyArea.COXA]: 'Coxa',
  [BodyArea.COXA_INTERNA]: 'Coxa Interna',
  [BodyArea.COXA_EXTERNA]: 'Coxa Externa',
  [BodyArea.JOELHO]: 'Joelho',
  [BodyArea.PANTURRILHA]: 'Panturrilha',
  [BodyArea.CANELA]: 'Canela',
  
  // Pés
  [BodyArea.PE]: 'Pé',
  [BodyArea.PE_COMPLETO]: 'Pé Completo',
  [BodyArea.TORNOZELO]: 'Tornozelo',
  [BodyArea.DEDOS_PE]: 'Dedos do Pé'
};

export const TattooStyleLabels: Record<TattooStyle, string> = {
  [TattooStyle.OLD_SCHOOL]: 'Old School',
  [TattooStyle.REALISMO]: 'Realismo',
  [TattooStyle.BLACKWORK]: 'Blackwork',
  [TattooStyle.AQUARELA]: 'Aquarela',
  [TattooStyle.MAORI]: 'Maori',
  [TattooStyle.JAPONES]: 'Japonês',
  [TattooStyle.GEOMETRICO]: 'Geométrico',
  [TattooStyle.MINIMALISTA]: 'Minimalista',
  [TattooStyle.TRIBAL]: 'Tribal',
  [TattooStyle.FINE_LINE]: 'Fine Line',
  [TattooStyle.PONTILHISMO]: 'Pontilhismo',
  [TattooStyle.ORNAMENTAL]: 'Ornamental'
};

export const TattooSizeLabels: Record<TattooSize, string> = {
  [TattooSize.PEQUENA]: 'Pequena (até 5cm)',
  [TattooSize.MEDIA]: 'Média (5-15cm)',
  [TattooSize.GRANDE]: 'Grande (15-30cm)',
  [TattooSize.EXTRA_GRANDE]: 'Extra Grande (30cm+)'
};

// Helper functions para obter o label traduzido
export function getProductCategoryLabel(category: ProductCategory): string {
  return ProductCategoryLabels[category] || category;
}

export function getOrderStatusLabel(status: OrderStatus): string {
  return OrderStatusLabels[status] || status;
}

export function getBookingStatusLabel(status: BookingStatus): string {
  return BookingStatusLabels[status] || status;
}

export function getPaymentStatusLabel(status: PaymentStatus): string {
  return PaymentStatusLabels[status] || status;
}

export function getBodyAreaLabel(area: BodyArea): string {
  return BodyAreaLabels[area] || area;
}

export function getTattooStyleLabel(style: TattooStyle): string {
  return TattooStyleLabels[style] || style;
}

export function getTattooSizeLabel(size: TattooSize): string {
  return TattooSizeLabels[size] || size;
}
