
import { Product, Category, Order, PaymentStatus, ShippingStatus } from './types';

export const CATEGORIES: Category[] = [
  { id: 1, name: "Men's Wear", slug: 'men', image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: "Women's Wear", slug: 'women', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: "Accessories", slug: 'accessories', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800' },
  { id: 4, name: "Footwear", slug: 'footwear', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800' },
];

export const PRODUCTS: Product[] = [
  // Men's Wear
  {
    id: 1,
    name: 'Structured Linen Blazer',
    slug: 'linen-blazer',
    sku: 'DP-MEN-001',
    description: 'Hand-loomed organic linen blazer. A breathable silhouette designed for the modern pioneer.',
    price: 8500,
    sale_price: 7200,
    stock: 45,
    category: 'men',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200',
    is_featured: true
  },
  {
    id: 5,
    name: 'Hand-loomed Cotton Panjabi',
    slug: 'cotton-panjabi',
    sku: 'DP-MEN-002',
    description: 'Traditional craftsmanship meets modern fit. Breathable cotton with intricate neck embroidery.',
    price: 4500,
    sale_price: 3800,
    stock: 60,
    category: 'men',
    image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&q=80&w=1200',
    is_featured: false
  },
  {
    id: 6,
    name: 'Slim-fit Indigo Denim',
    slug: 'indigo-denim',
    sku: 'DP-MEN-003',
    description: 'Premium raw indigo denim with a hint of stretch for all-day comfort and durability.',
    price: 3200,
    sale_price: 2800,
    stock: 85,
    category: 'men',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1200',
    is_featured: false
  },
  // Women's Wear
  {
    id: 2,
    name: 'Silk Archive Dress',
    slug: 'silk-dress',
    sku: 'DP-WMN-001',
    description: 'Fluid silk silhouette in obsidian black. Elegance redefined for the digital era.',
    price: 12500,
    sale_price: 10500,
    stock: 15,
    category: 'women',
    image: 'https://images.unsplash.com/photo-1539008835279-4346938827a3?auto=format&fit=crop&q=80&w=1200',
    is_featured: true
  },
  {
    id: 7,
    name: 'Embroidered Muslin Saree',
    slug: 'muslin-saree',
    sku: 'DP-WMN-002',
    description: 'Exquisite hand-embroidered muslin saree. A timeless piece of heritage and luxury.',
    price: 18500,
    sale_price: 16500,
    stock: 10,
    category: 'women',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200',
    is_featured: true
  },
  {
    id: 8,
    name: 'Contemporary Floral Kurti',
    slug: 'floral-kurti',
    sku: 'DP-WMN-003',
    description: 'Lightweight cotton kurti with modern floral prints. Perfect for everyday elegance.',
    price: 3500,
    sale_price: 2900,
    stock: 50,
    category: 'women',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1200',
    is_featured: false
  },
  // Accessories
  {
    id: 3,
    name: 'Cyber-Optic Glasses',
    slug: 'cyber-glasses',
    sku: 'DP-ACC-001',
    description: 'Blue-light filtering archives. Engineered for high-performance screen time.',
    price: 3500,
    sale_price: 2800,
    stock: 100,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1200',
    is_featured: true
  },
  {
    id: 9,
    name: 'Handcrafted Leather Wallet',
    slug: 'leather-wallet',
    sku: 'DP-ACC-002',
    description: 'Genuine top-grain leather wallet. Minimalist design with maximum utility.',
    price: 2500,
    sale_price: 1900,
    stock: 40,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200',
    is_featured: false
  },
  {
    id: 10,
    name: 'Minimalist Silver Cuff',
    slug: 'silver-cuff',
    sku: 'DP-ACC-003',
    description: '925 sterling silver cuff. A subtle statement of refined taste.',
    price: 5500,
    sale_price: 4800,
    stock: 25,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1200',
    is_featured: false
  },
  // Footwear
  {
    id: 4,
    name: 'Performance Runners',
    slug: 'performance-runners',
    sku: 'DP-FTW-001',
    description: 'Lightweight, breathable mesh upper with responsive cushioning for maximum performance.',
    price: 15500,
    sale_price: 12000,
    stock: 30,
    category: 'footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200',
    is_featured: false
  },
  {
    id: 11,
    name: 'Hand-stitched Leather Loafers',
    slug: 'leather-loafers',
    sku: 'DP-FTW-002',
    description: 'Classic leather loafers, hand-stitched for durability and timeless style.',
    price: 9500,
    sale_price: 8200,
    stock: 20,
    category: 'footwear',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=1200',
    is_featured: true
  },
  {
    id: 12,
    name: 'Premium Suede Chelsea Boots',
    slug: 'chelsea-boots',
    sku: 'DP-FTW-003',
    description: 'Soft suede Chelsea boots with an elastic side panel for a sleek, modern look.',
    price: 11500,
    sale_price: 9800,
    stock: 15,
    category: 'footwear',
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=1200',
    is_featured: false
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 1,
    orderNumber: 'VIB-2045',
    customerName: 'Rahat Khan',
    phone: '01711000000',
    address: 'Gulshan 2, Dhaka',
    area: 'Inside Dhaka',
    totalAmount: 45000,
    shippingCost: 60,
    paymentStatus: PaymentStatus.PAID,
    shippingStatus: ShippingStatus.PROCESSING,
    items: [],
    createdAt: '2024-05-20 14:30'
  }
];
