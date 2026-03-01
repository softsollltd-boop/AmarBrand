export enum ShippingStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed'
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  description: string;
  price: number;
  sale_price?: number;
  stock: number;
  category: string;
  image: string;
  is_featured?: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  area: string;
  totalAmount: number;
  shippingCost: number;
  paymentStatus: PaymentStatus;
  shippingStatus: ShippingStatus;
  items: CartItem[];
  createdAt: string;
}