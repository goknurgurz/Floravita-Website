import axios from 'axios';
import { Product, BlogPost, Testimonial, ApiResponse, Order, OrderForm, OrderItem } from '@/types';
import { mockProducts, mockBlogPosts, mockTestimonials } from './data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Ürünler ─────────────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  try {
    const { data } = await api.get<ApiResponse<Product[]>>('/api/products');
    return data.data ?? [];
  } catch {
    return mockProducts;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const { data } = await api.get<ApiResponse<Product[]>>('/api/products/featured');
    return data.data ?? [];
  } catch {
    return mockProducts.filter((p) => p.featured);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data } = await api.get<ApiResponse<Product>>(`/api/products/${slug}`);
    return data.data ?? null;
  } catch {
    return mockProducts.find((p) => p.slug === slug) ?? null;
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const { data } = await api.get<ApiResponse<Product[]>>(`/api/products/category/${category}`);
    return data.data ?? [];
  } catch {
    return mockProducts.filter((p) => p.category === category);
  }
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data } = await api.get<ApiResponse<BlogPost[]>>('/api/blog');
    return data.data ?? [];
  } catch {
    return mockBlogPosts;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data } = await api.get<ApiResponse<BlogPost>>(`/api/blog/${slug}`);
    return data.data ?? null;
  } catch {
    return mockBlogPosts.find((p) => p.slug === slug) ?? null;
  }
}

// ─── Yorumlar ────────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const { data } = await api.get<ApiResponse<Testimonial[]>>('/api/testimonials');
    return data.data ?? [];
  } catch {
    return mockTestimonials;
  }
}

// ─── Siparişler ───────────────────────────────────────────────────────────────

export interface CreateOrderPayload extends OrderForm {
  items: OrderItem[];
  total: number;
}

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  const { data } = await api.post<ApiResponse<Order>>('/api/orders', payload);
  if (!data.success || !data.data) throw new Error(data.error ?? 'Sipariş oluşturulamadı');
  return data.data;
}

export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  try {
    const { data } = await api.get<ApiResponse<Order>>(`/api/orders/${orderNumber}`);
    return data.data ?? null;
  } catch {
    return null;
  }
}

// ─── PayTR ────────────────────────────────────────────────────────────────────

export interface PaytrTokenPayload {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  city: string;
  items: { name: string; price: number; quantity: number }[];
  total: number;
  userIp: string;
}

export async function createPaytrToken(payload: PaytrTokenPayload): Promise<string> {
  const { data } = await api.post<{ success: boolean; token?: string; error?: string }>(
    '/api/paytr/create-token',
    payload,
  );
  if (!data.success || !data.token) throw new Error(data.error ?? 'Ödeme başlatılamadı');
  return data.token;
}

// ─── Bülten ──────────────────────────────────────────────────────────────────

export async function subscribeNewsletter(email: string): Promise<boolean> {
  try {
    await api.post('/api/newsletter', { email });
    return true;
  } catch {
    return false;
  }
}
