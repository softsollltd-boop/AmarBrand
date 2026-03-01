
import { Product } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../constants';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
const STORAGE_KEY = 'vibe_products_db';

// Helper to get local data
const getLocalProducts = (): Product[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored || JSON.parse(stored).length !== INITIAL_PRODUCTS.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  return JSON.parse(stored);
};

export const ProductService = {
  async getAllProducts(params?: { category?: string; search?: string }): Promise<Product[]> {
    try {
      const url = new URL(`${API_BASE_URL}/products`);
      if (params?.category) url.searchParams.append('category', params.category);
      if (params?.search) url.searchParams.append('search', params.search);

      const response = await fetch(url.toString());
      if (!response.ok) throw new Error('API Unavailable');
      const data = await response.json();
      return data.data; 
    } catch (error) {
      console.warn('Vibe-Store: Using Local Storage Engine.');
      let filtered = getLocalProducts();
      if (params?.category) filtered = filtered.filter(p => p.category === params.category);
      if (params?.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(query) || p.sku.toLowerCase().includes(query));
      }
      return filtered;
    }
  },

  async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const local = getLocalProducts();
    const newProduct = { ...product, id: Date.now() };
    const updated = [newProduct, ...local];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newProduct;
  },

  async updateProduct(id: number, updates: Partial<Product>): Promise<Product> {
    const local = getLocalProducts();
    const updated = local.map(p => p.id === id ? { ...p, ...updates } : p);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated.find(p => p.id === id)!;
  },

  async deleteProduct(id: number): Promise<void> {
    const local = getLocalProducts();
    const updated = local.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  async searchProducts(query: string): Promise<Product[]> {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return getLocalProducts().filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.sku.toLowerCase().includes(q)
    ).slice(0, 5);
  },

  async createOrder(orderData: any): Promise<{ success: boolean; payment_url?: string; message: string; order_number?: string }> {
    // Simulation for local development
    await new Promise(resolve => setTimeout(resolve, 1500));
    const orderNumber = 'AMAR-' + Math.floor(Math.random() * 100000);
    
    if (orderData.payment_method === 'cod') {
      return {
        success: true,
        message: 'Order Received',
        order_number: orderNumber
      };
    }

    return {
      success: true,
      message: 'Payment Initiated',
      order_number: orderNumber,
      payment_url: 'https://sandbox.aamarpay.com/pay/amar-demo'
    };
  }
};
