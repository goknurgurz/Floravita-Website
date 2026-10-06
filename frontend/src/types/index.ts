// Ürün tipi
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDesc?: string;
  price: number;
  oldPrice?: number;
  images: string[];
  category: string;
  stock: number;
  featured: boolean;
  rating: number;
  reviewCount: number;
  ingredients: string[];
  benefits: string[];
  createdAt: string;
  updatedAt: string;
}

// Sepet öğesi
export interface CartItem {
  product: Product;
  quantity: number;
}

// Blog yazısı
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage?: string;
  category: string;
  tags: string[];
  author: string;
  readTime: number;
  publishedAt: string;
}

// Müşteri yorumu
export interface Testimonial {
  id: string;
  name: string;
  location?: string;
  rating: number;
  comment: string;
  product?: string;
  avatar?: string;
  verified: boolean;
  createdAt: string;
}

// Sipariş öğesi
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// Sipariş formu
export interface OrderForm {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  city: string;
  district: string;
  zipCode?: string;
  notes?: string;
}

// Sipariş
export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  city: string;
  district: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string;
}

export type OrderStatus =
  | 'PENDING'
  | 'PAID'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

// API yanıtı
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Kategori filtresi
export type ProductCategory =
  | 'Tümü'
  | 'Probiyotik'
  | 'Prebiyotik'
  | 'Sindirim'
  | 'Bitkisel'
  | 'Paket';

export type BlogCategory =
  | 'Tümü'
  | 'Saglik'
  | 'Bilgi'
  | 'Program'
  | 'Beslenme';
